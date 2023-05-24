import { NextFunction, Response, Request } from "express";
import Song from "../models/Song";

interface FilterObj {
  songTitle?: any;
  artist?: any;
  genre?: any;
}

interface OptionsObj {
  limit?: any;
  sort?: any;
}

const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const filter: FilterObj = {};
  const options: OptionsObj = {};
  if (Object.keys(req.query).length) {
    const { songTitle, artist, genre, limit, sortByArtist } = req.query;

    if (songTitle) filter.songTitle = songTitle;
    if (artist) filter.artist = artist;
    if (genre) filter.genre = genre;

    if (limit) options.limit = limit;
    if (sortByArtist)
      options.sort = {
        artist: sortByArtist === "asc" ? 1 : -1,
      };
  }

  try {
    const songs = await Song.find({}, filter, options);

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

const getSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);

    res.status(200).setHeader("Content-Type", "application/json").json(song);
  } catch (err) {
    next(err);
  }
};

const updateSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.songId,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(updatedSong);
  } catch (err) {
    next(err);
  }
};

const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.songId);

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        message: `Success! Deleted song with id: ${req.params.songId}`,
        deletedSong,
      });
  } catch (err) {
    next(err);
  }
};

const getSongRatings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(song?.ratings);
  } catch (err) {
    next(err);
  }
};

const createSongRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);
    song!.ratings.push(req.body);
    await song?.save();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(req.body);
  } catch (err) {
    next(err);
  }
};

const deleteSongRatings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);
    song!.ratings.splice(0);
    await song?.save();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        message: `Success: Deleted all ratings from song with id: ${req.params.songId}`,
      });
  } catch (err) {
    next(err);
  }
};

const getSongRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);
    const rating = song!.ratings.find((r) =>
      r._id?.equals(req.params.ratingId)
    );

    if (!rating)
      throw new Error(`No rating found with id: ${req.params.ratingId}`);

    res.status(200).setHeader("Content-Type", "application/json").json(rating);
  } catch (err) {
    next(err);
  }
};

const updateSongRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);
    let rating = song!.ratings.find((r) => r._id?.equals(req.params.ratingId));

    if (!rating)
      throw new Error(`No rating found with id: ${req.params.ratingId}`);

    const indexOfRating: number = song!.ratings.indexOf(rating);
    song?.ratings.splice(indexOfRating, 1, req.body);
    await song?.save();
    rating = song?.ratings[indexOfRating];

    res.status(200).setHeader("Content-Type", "application/json").json(rating);
  } catch (err) {
    next(err);
  }
};

const deleteSongRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await Song.findById(req.params.songId);
    let rating = song!.ratings.find((r) => r._id?.equals(req.params.ratingId));

    if (!rating)
      throw new Error(`No rating found with id: ${req.params.ratingId}`);

    const indexOfRating: number = song!.ratings.indexOf(rating);
    song?.ratings.splice(indexOfRating, 1);
    await song?.save();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        message: `Success! Deleted rating with id ${req.params.ratingId}`,
      });
  } catch (err) {
    next(err);
  }
};

export {
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
};
