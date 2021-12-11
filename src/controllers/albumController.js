import mongoose from "mongoose";
import { AlbumSchema } from "../models/albumModel.js";
import { TrackSchema } from "../models/trackModel.js";

const Album = mongoose.model("Album", AlbumSchema);
const Track = mongoose.model("Track", TrackSchema);

export const getAlbum = (req, res) => {
  Album.find({}, (err, album) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(album);
  });
};

export const getAllTracksFromAlbum = (req, res) => {
  Track.find({ album: req.params.albumName }, (err, track) => {
    if (err) {
      res.status(400).send(err);
    }
    if (track.length === 0) {
      res.status(400).send(`No tracks in album ${req.params.albumName} exist.`);
    } else {
      res.status(200).json(track);
    }
  });
};

export const deletetrackFromAlbum = (req, res) => {
  Track.deleteOne(
    { name: req.params.trackName, album: req.params.albumName },
    (err, track) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json({
        message: `Successfully Removed ${req.params.trackName} from ${req.params.albumName} !`,
      });
    }
  );
};
