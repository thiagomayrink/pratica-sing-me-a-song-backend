import { Song } from "../entities/Song";

export interface songsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<Song[]>;
    insert(song: Song): Promise<void>;
}