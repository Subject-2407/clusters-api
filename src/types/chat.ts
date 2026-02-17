import { Document } from "mongoose";

export interface IChat extends Document {
    clusterName: string;
    senderName: string;
    colorCode: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}