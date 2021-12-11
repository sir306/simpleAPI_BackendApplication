import {
  getArtists,
  getArtistByName,
  getAllTracksByArtist,
  getAllAlbumsByArtist,
  deleteAlbumFromArtist,
  updateArtistInfo,
} from "../controllers/artistController.js";
import { auth } from "../middleware/auth.js";

const ArtistRoutes = (app) => {
  app
    .route("/artists")
    // GET all artists endpoint
    .get(auth, getArtists);

  app
    .route("/artist/:artistID")
    // PUT a specific artist
    .put(auth, updateArtistInfo);

  app
    .route("/artists/:artistName")
    // GET a specific Artist
    .get(auth, getArtistByName);

  app
    .route("/artists/:artistName/albums")
    // GET all albums by artist
    .get(auth, getAllAlbumsByArtist);

  app
    .route("/artists/:artistName/tracks")
    // GET all Tracks by artist
    .get(auth, getAllTracksByArtist);

  app
    .route("/artists/:artistName/:albumName")
    // DELETE album from artist
    .delete(auth, deleteAlbumFromArtist);
};

export default ArtistRoutes;
