import mongoose from "mongoose";
import { TrackSchema } from "../models/trackModel.js";

const Track = mongoose.model("Track", TrackSchema);

export const getTrack = (req, res) => {
  Track.find({}, (err, track) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(track);
  });
};

export const updateTrackInfo = (req, res) => {
  Track.findByIdAndUpdate(
    req.params.trackID,
    req.body,
    { new: true, useFindAndModify: false },
    (err, track) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(track);
    }
  );
};
