import { Genre } from "../entities/Genre";
import { PostgresGenresRepository } from "../repositories/PostgresGenresRepository";
import { IAddGenreServiceDTO } from "./IAddGenreServiceDTO";

export class AddGenreService {
    
    async execute(data: IAddGenreServiceDTO) {
        try{
            let status:number;

            const genresRepository = new PostgresGenresRepository();
            const genreAlreadyExists = await genresRepository.findByName(data.name);
            
    
            if (genreAlreadyExists){
                status = 409;
                return status;
            };
    
            const genre = new Genre(data);
    
            await genresRepository.save(genre);
            status = 201;
            return status;
        }catch (err){
            console.log(err);
        };
    };
};

