import { Router } from "express";
import { AddSongController } from "./controllers/AddSongController";
import { VoteSongController } from "./controllers/VoteSongController";

const addSongController = new AddSongController();
const voteSongController = new VoteSongController();

const router = Router();

router.post("/recommendations",  addSongController.handle);
router.post("/recommendations/:id/:voteType",  voteSongController.handle);

export { router };