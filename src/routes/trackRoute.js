import { getTrack, updateTrackInfo } from "../controllers/trackController.js";
import { auth } from "../middleware/auth.js";

const TrackRoutes = (app) => {
  app
    .route("/tracks")
    // GET all tracks endpoint
    .get(auth, getTrack);

  app
    .route("/tracks/:trackID")
    // PUT new track info
    .put(auth, updateTrackInfo);
};

export default TrackRoutes;
