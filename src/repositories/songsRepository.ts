import { song } from "../entities/Song";

export interface songsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<song>;
    save(song: song): Promise<void>;
}