import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

import { IUserDoc, IUserModel } from "./user.interface";
import { IResourceDoc } from "domains/resource/resource.interface";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  },
});
userSchema.static(
  "IsEmailTaken",
  async function (email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return !!user;
  }
);
userSchema.static("GetScopes", (resouces: IResourceDoc[]): string[] => {
  return resouces.reduce<string[]>((scopes, resource: IResourceDoc) => {
    const resourceScopes = resource.scopes;
    scopes.push(...resourceScopes);
    return scopes;
  }, []);
});

userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export default User;
