import {
  getAlbum,
  getAllTracksFromAlbum,
  deletetrackFromAlbum,
} from "../controllers/albumController.js";
import { auth } from "../middleware/auth.js";

const AlbumRoutes = (app) => {
  app
    .route("/albums")
    // GET all albums endpoint
    .get(auth, getAlbum);

  app
    .route("/albums/:albumName/tracks")
    // GET all tracks from album
    .get(auth, getAllTracksFromAlbum);

  app
    .route("/albums/:albumName/:trackName")
    // DELETE track from album
    .delete(auth, deletetrackFromAlbum);
};

export default AlbumRoutes;
