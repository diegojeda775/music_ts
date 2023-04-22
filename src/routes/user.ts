import { Router } from "express";
import {
  createUser,
  deleteUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = Router();

router.route("/").get(getUsers).post(createUser).delete(deleteUsers);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

export default router;
