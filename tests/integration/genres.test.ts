import "../../src/setup";
import supertest from "supertest";
import { app } from "../../src/app";
import {  fetchSongById, endConnection, clearSongs, clearGenres } from "../utils/utils";
import { createAndReturnSong, populateSongsTable } from "../factories/songFactory";
import { createAndReturnGenre, populateGenresTable } from "../factories/genreFactory";

beforeEach(async () => {
  await clearGenres();
});

afterAll(async () => {
  await endConnection();
});

const agent = supertest(app);

describe("POST /genres", () => {

  it("should answer with text \"OK!\" and status 201 for a valid genre body", async () => {
    const genre = {
      name: "test_genre"      
    } 

    const response = await agent.post("/genres").send(genre);

    expect(response.text).toBe("OK!");
    expect(response.status).toBe(201);
  });

  it("should answer with text \"error message!\" and status 409 for a repeated genre name", async () => {
    const genre = {
      name: "test_genre"      
    }
    await createAndReturnGenre("test_genre");
    
    const response = await agent.post("/genres").send(genre);

    expect(response.text).toBe("Genre already exists!");
    expect(response.status).toBe(409);
  });

  it("should answer with text \"Bad Request\" and status 400 for invalid genre name", async () => {
    const genre = {
      name: ""        
    }

    const response = await agent.post("/genres").send(genre);

    expect(response.text).toBe("Bad Request");
    expect(response.status).toBe(400);
  });
});

describe("GET /genres", () => {
  it("should answer with status 200 and a random song", async () => {
    await populateGenresTable();
    const response = await agent.get(`/genres`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining(
            {
              id: expect.any(Number),
              name: expect.any(String),
              score: expect.any(Number)
            }
          )
        ]
      )
    );
  });

  it("should answer with status 200 and empty array for empty genre table", async () => {
    const response = await agent.get(`/genres`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([])
    );
  });
});
