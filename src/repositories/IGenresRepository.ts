import { Genre } from "../entities/Genre";

export interface IGenresRepository {
    findByName(name: string): Promise<Genre[]|null>;
    findById(id: number): Promise<Genre[]|null>;
    save(genre: Genre): Promise<void>;
}