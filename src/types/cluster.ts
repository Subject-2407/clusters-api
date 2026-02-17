import { Document } from "mongoose";

export interface ICluster extends Document {
    name: string;
    peopleOnline: number;
    createdAt: Date;
    updatedAt: Date;
}