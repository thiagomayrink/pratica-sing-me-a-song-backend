import { Genre } from "../entities/Genre";

export interface IGenresRepository {
    findByName(name: string ): Promise<Genre>;
    save(genre: Genre): Promise<void>;
}