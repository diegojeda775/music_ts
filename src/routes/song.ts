import { Router } from "express";
import {
  getSongs,
  createSong,
  deleteSongs,
  getSong,
  updateSong,
  deleteSong,
  getSongRatings,
  createSongRating,
  deleteSongRatings,
  getSongRating,
  updateSongRating,
  deleteSongRating,
} from "../controllers/songController";

const router = Router();

router.route("/").get(getSongs).post(createSong).delete(deleteSongs);

router.route("/:songId").get(getSong).put(updateSong).delete(deleteSong);

router
  .route("/:songId/ratings")
  .get(getSongRatings)
  .post(createSongRating)
  .delete(deleteSongRatings);

router
  .route("/:songId/ratings/:ratingId")
  .get(getSongRating)
  .put(updateSongRating)
  .delete(deleteSongRating);

export default router;
