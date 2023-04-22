import { NextFunction, Request, Response } from "express";
import Artist from "../models/Artist";

interface FilterObj {
  firstName?: any;
  lastName?: any;
  genre?: any;
}

interface OptionsObj {
  limit?: any;
  sort?: any;
}

const getArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const filter: FilterObj = {};
  const options: OptionsObj = {};
  const { firstName, lastName, genre, limit, sortByGenre } = req.query;

  if (firstName) filter.firstName = firstName;
  if (lastName) filter.lastName = lastName;
  if (genre) filter.genre = genre;

  if (limit) options.limit = limit;
  if (sortByGenre)
    options.sort = {
      genre: sortByGenre === "asc" ? 1 : -1,
    };

  try {
    const artists = await Artist.find({}, filter, options);

    res.status(200).setHeader("Content-Type", "application/json").json(artists);
  } catch (err) {
    next(err);
  }
};

const createArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newArtist = await Artist.create(req.body);

    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json(newArtist);
  } catch (err) {
    next(err);
  }
};

const deleteArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedArtists = await Artist.deleteMany();

    res.status(200).setHeader("Content-Type", "application/json").json({
      message: "Success! Deleted all artists",
      deletedArtists,
    });
  } catch (err) {
    next(err);
  }
};

const getArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const artist = await Artist.findById(req.params.artistId);

    res.status(200).setHeader("Content-Type", "application/json").json(artist);
  } catch (err) {
    next(err);
  }
};

const updateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newArtist = await Artist.findByIdAndUpdate(
      req.params.artistId,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(newArtist);
  } catch (err) {
    next(err);
  }
};

const deleteArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.artistId);

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        message: `Success! Deleted artist with id: ${req.params.id}`,
        deletedArtist,
      });
  } catch (err) {
    next(err);
  }
};

export {
  getArtists,
  createArtist,
  deleteArtists,
  getArtist,
  updateArtist,
  deleteArtist,
};
