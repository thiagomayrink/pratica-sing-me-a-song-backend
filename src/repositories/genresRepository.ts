import { genre } from "../entities/Genre";

export interface genresRepository {
    findByName(name: string ): Promise<genre>;
    save(genre: genre): Promise<void>;
}