import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 10,
  },
  genre: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Artist", ArtistSchema);
