import { ISongsRepository } from "./ISongsRepository";
import { connection } from "../database";
import { Song } from "../entities/Song";

export class postgresSongsRepository implements ISongsRepository {

    async findByYoutubeLink(youtubeLink: string): Promise<Song[]>{
        const { rows:songs } = await connection.query(`
            SELECT * FROM songs WHERE "youtubeLink" = ($1)
        `,[youtubeLink]);

        return songs[0]||null;
    }

    async insert(song: Song): Promise<void>{
        const {name, youtubeLink, score} = song;
        await connection.query(`
            INSERT INTO songs 
            (name, "youtubeLink", score) 
            VALUES ($1,$2,0)`,
            [name, youtubeLink]
        );
    }
}
