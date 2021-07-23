import "../../src/setup";
import supertest from "supertest";
import { app } from "../../src/app";
import {  fetchSongById, endConnection, clearSongs  } from "../utils/utils";
import { createAndReturnSong, populateSongsTable } from "../factories/songFactory";

beforeEach(async () => {
  await clearSongs();
});

afterAll(async () => {
  await endConnection();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should answer with text \"OK!\" and status 201 for a valid song body", async () => {
    const song = {
      name: "Tocando em Frente - Almir Sater",
      youtubeLink:"https://youtube.com/watch?v=y5RNbKh9ZRQ"
    } 

    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toBe("OK!");
    expect(response.status).toBe(201);
  });

  it("should answer with text \"error message!\" and status 409 for a repeated youtubeLink", async () => {
    const song = {
      name: "Tocando em Frente - Almir Sater",
      youtubeLink:"https://youtube.com/watch?v=y5RNbKh9ZRQ"
    }
    await createAndReturnSong("Tocando em Frente - Almir Sater", "https://youtube.com/watch?v=y5RNbKh9ZRQ");
    
    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toBe("Song already exists!");
    expect(response.status).toBe(409);
  });

  it("should answer with text \"Bad Request\" and status 400 for invalid video name", async () => {
    const song = {
        name: "",
        youtubeLink:"https://youtube.com/watch?v=y5RNbKh9ZRQ"
    }

    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toBe("Bad Request");
    expect(response.status).toBe(400);
  });

  it("should answer with text \"Bad Request\" and status 400 for invalid youtube link", async () => {
    const song = {
        name: "valid_vídeo_name",
        youtubeLink:"invalid_youtube_link"
    }

    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toBe("Bad Request");
    expect(response.status).toBe(400);
  });
});

describe("POST /recommendations/:id/:voteType", () => {
  it("should answer with text \"OK!\", status 200 and raise song score +1 for valid upvote parms", async () => {
    const voteType = "upvote";
    const song = await createAndReturnSong();

    const response = await agent.post(`/recommendations/${song.id}/${voteType}`);
    const upVotedSong = await fetchSongById(song.id);

    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
    expect(song.score).toBe(0);
    expect(upVotedSong.score).toBe(1);
  });

  it("should answer with text \"OK!\", status 200 and lower song score -1 for valid downvote parms", async () => {
    const voteType = "downvote";
    const song = await createAndReturnSong();

    const response = await agent.post(`/recommendations/${song.id}/${voteType}`);
    const downVotedSong = await fetchSongById(song.id);

    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
    expect(song.score).toBe(0);
    expect(downVotedSong.score).toBe(-1);
  });

  it("should answer with text \"OK!\", status 200 and delete song with score -5", async () => {
    const voteType = "downvote";
    const song = await createAndReturnSong("Tocando em Frente - Almir Sater", "https://youtube.com/watch?v=y5RNbKh9ZRQ", -4);

    const response = await agent.post(`/recommendations/${song.id}/${voteType}`);
    const downVotedSong = await fetchSongById(song.id);

    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
    expect(song.score).toBe(-4);
    expect(downVotedSong).toBe(null);
  });
  
  it("should answer with text \"Bad Request\", status 400 for invalid voteType parms", async () => {
    const voteType = "invalid_voteType_param";
    const song = await createAndReturnSong();

    const response = await agent.post(`/recommendations/${song.id}/${voteType}`);
    const downVotedSong = await fetchSongById(song.id);

    expect(response.text).toBe("Bad Request");
    expect(response.status).toBe(400);
    expect(song.score).toBe(0);
    expect(downVotedSong.score).toBe(0);
  });

  it("should answer with text \"Bad Request\", status 400 for invalid song id", async () => {
    const voteType = "downvote";
    const response = await agent.post(`/recommendations/${"invalid_song_id"}/${voteType}`);

    expect(response.text).toBe("Invalid Song id!");
    expect(response.status).toBe(404);
  });
});

describe("GET /recommendations/random", () => {
  it("should answer with status 200 and a random song", async () => {
    await populateSongsTable();
    const response = await agent.get(`/recommendations/random`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining(
        {
          id: expect.any(Number),
          name: expect.any(String),
          youtubeLink: expect.any(String),
          score: expect.any(Number)
        }
      )
    );
  });

  it("should answer with status 404 for empty songs table", async () => {
    const response = await agent.get(`/recommendations/random`);
    
    expect(response.status).toBe(404);
  });
});

describe("GET /recommendations/top/:amount", () => {
  it("should answer with status 200 and an array with the top ''amount'' songs", async () => {
    await populateSongsTable();
    const amount = 10;

    const response = await agent.get(`/recommendations/top/${amount}`);
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(amount);
    expect(response.body).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining(
            {
              id: expect.any(Number),
              name: expect.any(String),
              youtubeLink: expect.any(String),
              score: expect.any(Number)
            }
          )
        ]
      )
    );
  });

  it("should answer with status 200 and an empty array if songs table is empty", async () => {
    const amount = 10;
    const response = await agent.get(`/recommendations/top/${amount}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });
});