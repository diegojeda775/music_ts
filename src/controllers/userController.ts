import { NextFunction, Request, Response } from "express";
import User from "../models/User";

interface filterObj {
  userName?: any;
  age?: any;
}

interface optionsObj {
  limit?: any;
  sort?: any;
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const filter: filterObj = {};
  const options: optionsObj = {};
  if (Object.keys(req.query).length) {
    const { userName, age, limit, sortByAge } = req.query;

    if (userName) filter.userName = userName;
    if (age) filter.age = age;

    if (limit) options.limit = limit;
    if (sortByAge)
      options.sort = {
        age: sortByAge === "asc" ? 1 : -1,
      };
  }
  try {
    const users = await User.find({}, filter, options);

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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(200).setHeader("Content-Type", "application/json").json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        message: `Success! Deleted user with id: ${req.params.userId}.`,
        deletedUser,
      });
  } catch (err) {
    next(err);
  }
};

export { getUsers, createUser, deleteUsers, getUser, updateUser, deleteUser };
