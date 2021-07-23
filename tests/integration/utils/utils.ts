import "../../../src/setup";
import { connection } from "../../../src/database";

async function createAndReturnSong(name?:string, youtubeLink?: string, score?:number) {
    
    const song = {
        name: name||"Tocando em Frente - Almir Sater",
        youtubeLink: youtubeLink||"https://youtube.com/watch?v=y5RNbKh9ZRQ",
        score: score||0
    } 
    
    const {rows} = await connection.query(`
        INSERT INTO songs 
        (name, "youtubeLink", score) 
        VALUES ($1,$2,$3)
        RETURNING *`,
        [song.name, song.youtubeLink, song.score]
    );
    return rows[0];
}

async function fetchSongById(id: number) {
    const { rows:songs } = await connection.query(`
        SELECT * FROM songs WHERE "id" = ($1)
    `,[id]);

    return songs[0] || null;
};

export { createAndReturnSong,fetchSongById };