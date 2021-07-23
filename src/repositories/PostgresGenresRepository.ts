import { connection } from "../database";
import { Genre } from "../entities/Genre";
import { IGenresRepository } from "./IGenresRepository";

export class PostgresGenresRepository implements IGenresRepository {

    async findByName(name: string): Promise<Genre[]|null>{
        const { rows:genres } = await connection.query(`
            SELECT * FROM genres WHERE name = $1
        `,[name]);

        return genres[0] || null;
    }
    
    async findById(id: number): Promise<Genre[]|null>{
        const { rows:genres } = await connection.query(`
            SELECT * FROM genres WHERE id = $1
        `,[id]);

        return genres[0] || null;
    };
    
    async save(genre: Genre): Promise<void>{
        const { name } = genre;
        await connection.query(`
            INSERT INTO genres 
            (name, score) 
            VALUES ($1, 0)`,
            [name]
        );
    };
};

