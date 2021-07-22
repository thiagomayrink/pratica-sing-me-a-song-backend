import { Genre } from "../entities/Genre";

export interface genresRepository {
    findByName(name: string ): Promise<Genre>;
    save(genre: Genre): Promise<void>;
}