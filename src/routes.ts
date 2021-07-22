import { Router } from "express";
import { AddSongController } from "./controllers/AddSongController";

const router = Router();
const addSongController = new AddSongController();

router.post("/recommendations",  addSongController.handle);

export { router };