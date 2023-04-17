import { Router } from "express";
import {
  createArtist,
  deleteArtists,
  getArtists,
} from "../controllers/artistController";

const router = Router();

router.route("/").get(getArtists).post(createArtist).delete(deleteArtists);

export default router;
