import { NextFunction, Request, Response } from "express";
import Artist from "../models/Artist";

const getArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const artists = await Artist.find();

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

export { getArtists, createArtist, deleteArtists };
