import { Request, Response } from "express";
import { ICluster } from "../types/cluster";
import { ClusterModel } from "../models/Cluster";

// retrieve all available clusters
export const getClusters = async (req: Request, res: Response) => {
    try {
        const clusters: ICluster[] = await ClusterModel.find();
        res.status(200).json(clusters);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err });
    }
};

// retrieve a cluster
export const findCluster = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        if (!name) {
            res.status(404).json({ message: 'Request error.', error: 'Missing query params: name' });
            return;
        }
        
        const existingCluster: ICluster | null = await ClusterModel.findOne({ name });
        
        if (!existingCluster) {
            res.status(404).json({ message: 'Cluster not found.' });
            return;
        }

        res.status(200).json(existingCluster);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err });
    }
}

// create a cluster
export const createCluster = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const existingCluster: ICluster | null = await ClusterModel.findOne({ name });
        if (existingCluster) {
            res.status(409).json({ message: 'Cluster already exists.' });
            return;
        }

        const newCluster: ICluster = new ClusterModel({ name, peopleOnline: 0 });
        const savedCluster = await newCluster.save();

        res.status(201).json(savedCluster);
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "ValidationError") {
                return res.status(400).json({ message: 'Request error.', error: err.message });
            }
        }
        res.status(500).json({ message: 'Server error.', error: err });
    }
};

// update online people count on a cluster
export const updateOnlinePeopleCount = async (req: Request, res: Response) => {
    try {
        const { clusterName, peopleOnline } = req.body;

        const updatedCluster: ICluster | null = await ClusterModel.findOneAndUpdate(
            { name: clusterName },
            { $set: { peopleOnline } },
            { returnDocument: 'after' }
        );
        
        if (!updatedCluster) {
            res.status(404).json({ message: 'Cluster not found.' });
            return;
        }

        res.status(200).json(updatedCluster);
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "ValidationError") {
                return res.status(400).json({ message: 'Request error.', error: err.message });
            }
        }
        res.status(500).json({ message: 'Server error.', error: err });
    }
}