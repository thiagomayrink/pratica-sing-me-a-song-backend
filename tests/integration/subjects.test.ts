import "../../src/setup";
import supertest from "supertest";
import { app } from "../../src/app";
import { endConnection, clearGenres } from "../utils/utils";
import { populateSubjectsTable } from "../factories/genreFactory";

beforeEach(async () => {
  await clearGenres();
});

afterAll(async () => {
  await endConnection();
});

const agent = supertest(app);

describe("POST /genres", () => {
  it("should populate subjects", async () => {
    populateSubjectsTable();
  });
});
