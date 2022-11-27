import type mongoose from "mongoose";

export interface UserData {
  username: string;
  password: string;
}

export interface RegisterData extends UserData {
  email: string;
  _id?: mongoose.Types.ObjectId;
}
