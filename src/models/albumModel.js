import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AlbumSchema = new Schema({
  artist: {
    type: String,
    required: "Enter artist name",
  },
  name: {
    type: String,
    required: "Enter album name",
  },
});
