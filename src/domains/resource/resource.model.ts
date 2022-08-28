import mongoose from "mongoose";
import { IResourceDoc, IResourceModel } from "./resource.interface";

const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    scopes: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: false }
);

const Resource = mongoose.model<IResourceDoc, IResourceModel>(
  "Resource",
  ResourceSchema
);

export default Resource;
