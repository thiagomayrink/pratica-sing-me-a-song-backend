import "../../src/setup";
import { connection } from "../../src/database";
async function clearDatabase() {
    await connection.query('DELETE FROM songs');
    await connection.query('DELETE FROM genres');
    await connection.query('DELETE FROM genres_songs');
}
async function clearSongs() {
    await connection.query('DELETE FROM songs');
}

async function endConnection() {
    await connection.end();
}

async function fetchSongById(id: number) {
    const { rows:songs } = await connection.query(`
        SELECT * FROM songs WHERE "id" = ($1)
    `,[id]);

    return songs[0] || null;
};

export { fetchSongById, endConnection, clearDatabase, clearSongs };