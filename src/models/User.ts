import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 10,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: (email: string) => validator.isEmail(email),
    },
    password: {
      type: String,
      required: true,
      validate: (password: string) => validator.isStrongPassword(password),
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "female", "male"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
