import { Router } from "express";
import { AddSongController } from "../controllers/AddSongController";
import { RandomSongController } from "../controllers/RandomSongController";
import { TopSongController } from "../controllers/TopSongController";
import { VoteSongController } from "../controllers/VoteSongController";

const addSongController = new AddSongController();
const voteSongController = new VoteSongController();
const randomSongController = new RandomSongController();
const topSongController = new TopSongController();

const recommendation = Router();

recommendation.post("/",  addSongController.handle);
recommendation.post("/:id/:voteType",  voteSongController.handle);
recommendation.get("/random",  randomSongController.handle);
recommendation.get("/top/:amount", topSongController.handler);

export default recommendation;