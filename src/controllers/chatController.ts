import { Request, Response } from "express";
import { IChat } from "../types/chat";
import { ChatModel } from "../models/Chat";
import { ClusterModel } from "../models/Cluster";
import { ICluster } from "../types/cluster";

// retrieve all chats from a cluster
export const getChats = async (req: Request, res: Response) => {
    try {
        const { clusterName } = req.query;

        if (!clusterName) {
            res.status(404).json({ message: 'Request error.', error: 'Missing query params: clusterName' });
            return;
        }
        
        const existingCluster: ICluster | null = await ClusterModel.findOne({ name: clusterName });

        if (!existingCluster) {
            res.status(404).json({ message: 'Cluster not found.' });
            return;
        }

        const chats: IChat[] = await ChatModel.find({ clusterName });
        res.status(200).json({
            cluster: existingCluster,
            chats
        }); 
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err });
    }
};

// create a chat message on a cluster
export const createChat = async (req: Request, res: Response) => {
    try {
        const { clusterName, senderName, colorCode, message } = req.body;

        const existingCluster: ICluster | null = await ClusterModel.findOne({ name: clusterName });

        if (!existingCluster) {
            res.status(404).json({ message: 'Cluster not found.' });
            return;
        }

        const newChat: IChat = new ChatModel({ clusterName, senderName, colorCode, message });
        const savedChat = await newChat.save();

        res.status(201).json(savedChat);
    } catch (err) {
        if (err instanceof Error) {
            if (err.name === "ValidationError") {
                return res.status(400).json({ message: 'Request error.', error: err.message });
            }
        }
        res.status(500).json({ message: 'Server error.', error: err });
    }
}