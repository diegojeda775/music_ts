import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    rating: {
      type: Number,
    },
    text: {
      type: String,
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
      require: true,
      maxLength: 30,
    },
    artist: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
    },
    ratings: [RatingSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Song", SongSchema);
