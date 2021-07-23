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
    
    async findById(id: number): Promise<Song[]>{
        const { rows:songs } = await connection.query(`
            SELECT * FROM songs WHERE "id" = ($1)
        `,[id]);

        return songs[0] || null;
    };

    async save(song: Song): Promise<void>{
        const { name, youtubeLink } = song;
        await connection.query(`
            INSERT INTO songs 
            (name, "youtubeLink", score) 
            VALUES ($1,$2,0)`,
            [name, youtubeLink]
        );
    };

    async delete(id: number): Promise<void>{
        await connection.query(`
            DELETE FROM songs WHERE "id" = ($1)
        `,[id]);
    };

    async upVote(id: number): Promise<void>{

        await connection.query(`
            UPDATE songs 
            SET score = score + 1
            WHERE id = $1`,
            [id]
        );
    };

    async downVote(id: number): Promise<Song[]>{
        
        const result = await connection.query(`
            UPDATE songs 
            SET score = score - 1
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return result.rows || null; 
    };

    async fetchAboveScore10(): Promise<Song[]> {
        const { rows } = await connection.query(`
            SELECT * FROM songs WHERE "score" > 10
        `);
        
        return rows || null;
    }

    async fetchBelowScore10(): Promise<Song[]> {
        const { rows } = await connection.query(`
            SELECT * FROM songs WHERE "score" <= 10
        `);

        return rows || null;
    }
};

