import { Router } from "express";
import { AddGenreController } from "./controllers/AddGenreController";
import { AddSongController } from "./controllers/AddSongController";
import { FetchGenreController } from "./controllers/FetchGenreController";
import { RandomSongController } from "./controllers/RandomSongController";
import { TopSongController } from "./controllers/TopSongController";
import { VoteSongController } from "./controllers/VoteSongController";

const addSongController = new AddSongController();
const voteSongController = new VoteSongController();
const randomSongController = new RandomSongController();
const topSongController = new TopSongController();

const addGenreController = new AddGenreController();
const fetchGenreController = new FetchGenreController();

const router = Router();

router.post("/recommendations",  addSongController.handle);
router.post("/recommendations/:id/:voteType",  voteSongController.handle);
router.get("/recommendations/random",  randomSongController.handle);
router.get("/recommendations/top/:amount", topSongController.handler);

router.post("/genres",  addGenreController.handle);
router.get("/genres",  fetchGenreController.handler);

export { router };