import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TrackSchema = new Schema({
  artist: {
    type: String,
    required: "Enter artist name",
  },
  name: {
    type: String,
    required: "Enter track name",
  },
  album: {
    type: String,
    required: "Enter album name",
  },
});
