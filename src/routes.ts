import { Router } from "express";
import { AddSongController } from "./controllers/AddSongController";
import { RandomSongController } from "./controllers/RandomSongController";
import { VoteSongController } from "./controllers/VoteSongController";

const addSongController = new AddSongController();
const voteSongController = new VoteSongController();
const randomSongController = new RandomSongController();

const router = Router();

router.post("/recommendations",  addSongController.handle);
router.post("/recommendations/:id/:voteType",  voteSongController.handle);
router.get("/recommendations/random",  randomSongController.handle);

export { router };