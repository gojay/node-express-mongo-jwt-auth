import mongoose from "mongoose";
import { IRoleDoc, IRoleModel } from "./role.interface";

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
        required: true,
      },
    ],
  },
  { timestamps: false }
);

const Role = mongoose.model<IRoleDoc, IRoleModel>("Role", RoleSchema);

export default Role;
