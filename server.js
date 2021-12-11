import express from "express";
import AlbumRoutes from "./src/routes/albumRoute.js";
import ArtistRoutes from "./src/routes/artistroute.js";
import TrackRoutes from "./src/routes/trackRoute.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserRoutes from "./src/routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;
const database = process.env.MONGODB_URI;

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(
  database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) console.log(err);
    console.log("Database has connected successfully!");
  }
);

// Set body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set cookie middleware
app.use(cookieParser());

// pass app into routes
AlbumRoutes(app);
ArtistRoutes(app);
TrackRoutes(app);
UserRoutes(app);

// confirm app running on correct port
app.get("/", (req, res) => {
  res.send(`App is running on port: ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});
