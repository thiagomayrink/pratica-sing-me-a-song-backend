import { Router } from "express";
import { AddGenreController } from "../controllers/AddGenreController";
import { FetchGenreController } from "../controllers/FetchGenreController";

const addGenreController = new AddGenreController();
const fetchGenreController = new FetchGenreController();

const genres = Router();

genres.post("/",  addGenreController.handle);
genres.get("/",  fetchGenreController.handler);

export default genres;