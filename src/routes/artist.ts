import { Router } from "express";
import {
  createArtist,
  deleteArtists,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artistController";

const router = Router();

router.route("/").get(getArtists).post(createArtist).delete(deleteArtists);

router
  .route("/:artistId")
  .get(getArtist)
  .put(updateArtist)
  .delete(deleteArtists);

export default router;
