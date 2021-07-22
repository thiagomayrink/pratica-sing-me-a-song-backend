import { Song } from "../entities/Song";

export interface ISongsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<Song[]>;
    insert(song: Song): Promise<void>;
}