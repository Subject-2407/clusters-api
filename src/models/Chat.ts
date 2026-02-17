import { model, Schema } from "mongoose";
import { IChat } from "../types/chat";

const ChatSchema = new Schema<IChat>(
    {
        clusterName: {type: String, ref: 'Cluster', required: [true, "Cluster name is required"]},
        senderName: {type: String, required: [true, "Sender name is required"]},
        colorCode: {type: String, required: [true, "Color code is required"]},
        message: {type: String, required: [true, "Message is required"]},
    },
    { timestamps: true }
);

export const ChatModel = model<IChat>('Chat', ChatSchema);