import { NextFunction, Response, Request } from "express";
import Song from "../models/song";

// interface Props {
//   req: Request;
//   res: Response;
//   next: NextFunction;
// }

const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const songs = await Song.find();

    res.status(200).setHeader("Content-Type", "application/json").json(songs);
  } catch (err) {
    next(err);
  }
};

const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newSong = await Song.create(req.body);

    res.status(200).setHeader("Content-Type", "application/json").json(newSong);
  } catch (err) {
    next(err);
  }
};

const deleteSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedSongs = await Song.deleteMany();

    res.status(200).setHeader("Content-Type", "application/json").json({
      message: "Success: Deleted all songs",
      deletedSongs,
    });
  } catch (err) {
    next(err);
  }
};

export { getSongs, createSong, deleteSongs };
