import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    rating: {
      type: Number,
      max: 5,
      min: 1,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const SongSchema = new Schema(
  {
    songTitle: {
      type: String,
      required: true,
      maxLength: 30,
    },
    artist: {
      type: String,
      unique: true,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    ratings: [RatingSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", SongSchema);
