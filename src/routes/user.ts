import { Router } from "express";
import {
  createUser,
  deleteUsers,
  getUsers,
} from "../controllers/userController";

const router = Router();

router.route("/").get(getUsers).post(createUser).delete(deleteUsers);

export default router;
