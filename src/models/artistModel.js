import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ArtistSchema = new Schema({
  name: {
    type: String,
    required: "Enter artist name",
  },
});
