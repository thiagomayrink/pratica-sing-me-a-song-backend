import { Song } from "../entities/Song";

export interface ISongsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<Song[]>;
    save(song: Song): Promise<void>;
    upVote(song: Song): Promise<void>;
    downVote(song: Song): Promise<Song[]>;
}