import { NextFunction, Request, Response } from "express";
import User from "../models/User";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();

    res.status(200).setHeader("Content-Type", "application/json").json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).setHeader("Content-Type", "application/json").json(newUser);
  } catch (err) {
    next(err);
  }
};

const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUsers = await User.deleteMany();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ message: "Success! Deleted all users.", deletedUsers });
  } catch (err) {
    next(err);
  }
};

export { getUsers, createUser, deleteUsers };
