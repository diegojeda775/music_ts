import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      maxLength: 10,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 10,
    },
    lastName: {
      type: String,
      maxLength: 10,
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
      required: true,
      type: Number,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "female", "male"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.userName = this.userName.trim();
  this.firstName = this.firstName.trim();
  this.lastName = this.lastName.trim();

  next();
});

export default mongoose.model("User", UserSchema);
