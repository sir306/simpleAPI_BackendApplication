import mongoose from "mongoose";
import { ArtistSchema } from "../models/artistModel.js";
import { TrackSchema } from "../models/trackModel.js";
import { AlbumSchema } from "../models/albumModel.js";

const Artist = mongoose.model("Artist", ArtistSchema);
const Track = mongoose.model("Track", TrackSchema);
const Album = mongoose.model("Album", AlbumSchema);

export const getArtists = (req, res) => {
  Artist.find({}, (err, artist) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(artist);
  });
};

export const getAllTracksByArtist = (req, res) => {
  Track.find({ artist: req.params.artistName }, (err, track) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(track);
  });
};

export const getArtistByName = (req, res) => {
  Artist.find({ name: req.params.artistName }, (err, artist) => {
    if (err) {
      res.status(400).send(err);
    }
    if (artist.length === 0) {
      res
        .status(400)
        .send(`No artist with the name ${req.params.artistName} exists.`);
    } else {
      res.status(200).json(artist);
    }
  });
};

export const getAllAlbumsByArtist = (req, res) => {
  Album.find({ artist: req.params.artistName }, (err, album) => {
    if (err) {
      res.status(400).send(err);
    }
    if (album.length === 0) {
      res
        .status(400)
        .send(`No albums exist for ${req.params.artistName} exists.`);
    } else {
      res.status(200).json(album);
    }
  });
};

export const deleteAlbumFromArtist = (req, res) => {
  Album.findOne(
    { name: req.params.albumName, artist: req.params.artistName },
    (err, album) => {
      if (err) {
        res.status(400).send(err);
      }
      if (!album) {
        res
          .status(400)
          .send(
            `No album called ${req.params.albumName} exists for ${req.params.artistName}.`
          );
      } else {
        Album.deleteOne(
          { name: req.params.albumName, artist: req.params.artistName },
          (err, album) => {
            if (err) {
              res.status(400).send(err);
            }
            res.status(200).json({
              message: `Successfully Removed ${req.params.albumName} from ${req.params.artistName} !`,
            });
          }
        );
      }
    }
  );
};

export const updateArtistInfo = (req, res) => {
  Artist.findByIdAndUpdate(
    req.params.artistID,
    req.body,
    { new: true, useFindAndModify: false },
    (err, artist) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(artist);
    }
  );
};
