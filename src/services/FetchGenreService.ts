import { Genre } from "../entities/Genre";
import { PostgresGenresRepository } from "../repositories/PostgresGenresRepository";

export class FetchGenreService {
    
    async execute(): Promise<Genre[]|null> {
        const genresRepository = new PostgresGenresRepository;

        try{
        const genres = await genresRepository.getAll();
        return genres;

        }catch(err){
            console.log(err);
        }
    }
}