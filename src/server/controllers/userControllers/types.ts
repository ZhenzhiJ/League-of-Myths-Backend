import type { InferSchemaType, Types } from "mongoose";
import type { userSchema } from "../../../database/models/User";

export interface UserData {
  username: string;
  password: string;
}

export interface RegisterData extends UserData {
  email: string;
}

export type UserStructure = InferSchemaType<typeof userSchema>;
export interface UserWithId extends UserStructure {
  _id: Types.ObjectId;
}
