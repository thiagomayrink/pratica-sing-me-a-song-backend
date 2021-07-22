import { ISongsRepository } from "./ISongsRepository";
import { connection } from "../database";
import { Song } from "../entities/Song";

export class PostgresSongsRepository implements ISongsRepository {

    async findByYoutubeLink(youtubeLink: string): Promise<Song[]>{
        const { rows:songs } = await connection.query(`
            SELECT * FROM songs WHERE "youtubeLink" = ($1)
        `,[youtubeLink]);

        return songs[0] || null;
    }

    async save(song: Song): Promise<void>{
        const {name, youtubeLink, score} = song;
        await connection.query(`
            INSERT INTO songs 
            (name, "youtubeLink", score) 
            VALUES ($1,$2,0)`,
            [name, youtubeLink]
        );
    }

    async upVote(song: Song): Promise<void>{
        const {id} = song;
        await connection.query(`
            UPDATE songs 
            SET score = score + 1
            WHERE id = $1`,
            [id]
        );
    }

    async downVote(song: Song): Promise<Song[]>{
        const {id} = song;
        const { rows:songs } = await connection.query(`
            UPDATE songs 
            SET score = score - 1
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return songs[0] || null; 
    }
}

