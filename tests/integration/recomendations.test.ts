import "../../src/setup";
import supertest from "supertest";
import { app } from "../../src/app";
import {connection} from "../../src/database";

beforeEach(async () => {
  await connection.query('DELETE FROM songs');
});

afterAll(async () => {
  await connection.end();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should answer with text \"OK!\" and status 201 for a valid song body", async () => {
    const song = {
        name: "Tocando em Frente - Almir Sater",
        youtubeLink:"https://youtube.com/watch?v=y5RNbKh9ZRQ"
    } 

    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toEqual("OK!");
    expect(response.status).toEqual(201);
  });

  it("should answer with text \"error message!\" and status 409 for a repeated youtubeLink", async () => {
    const song = {
        name: "Tocando em Frente - Almir Sater",
        youtubeLink:"https://youtube.com/watch?v=y5RNbKh9ZRQ"
    } 

    await connection.query(`
        INSERT INTO songs 
        (name, "youtubeLink", score) 
        VALUES ($1,$2,0)`,
        [song.name, song.youtubeLink]
    );

    const response = await agent.post("/recommendations").send(song);

    expect(response.text).toEqual(expect.any(String));
    expect(response.status).toEqual(409);
  });

  it("should answer with text \"error message!\" and status 400 for invalid parameters", async () => {
    const song = {
        name: "",
        youtubeLink:""
    }

    const response = await agent.post("/recommendations").send(song);

    expect(response.status).toEqual(400);
  });
});