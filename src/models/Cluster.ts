import { model, Schema } from "mongoose";
import { ICluster } from "../types/cluster";

const ClusterSchema = new Schema<ICluster>(
    {
        name: {type: String, required: [true, "Cluster name is required"], unique: true},
        peopleOnline: {type: Number, required: [true, "Online people count is required"]},
    },
    { timestamps: true}
);

export const ClusterModel = model<ICluster>('Cluster', ClusterSchema);