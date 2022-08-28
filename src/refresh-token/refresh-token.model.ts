import mongoose from "mongoose";
import {
  IRefreshTokenDoc,
  IRefreshTokenModel,
} from "./refresh-token.interface";

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

RefreshTokenSchema.method("isExpired", function () {
  return this.expiredAt.getTime() < new Date().getTime();
});

const RefreshToken = mongoose.model<IRefreshTokenDoc, IRefreshTokenModel>(
  "RefreshToken",
  RefreshTokenSchema
);

export default RefreshToken;
