import { Router } from "express";
import {
  getSongs,
  createSong,
  deleteSongs,
} from "../controllers/songController";

const router = Router();

router.route("/").get(getSongs).post(createSong).delete(deleteSongs);

export default router;
