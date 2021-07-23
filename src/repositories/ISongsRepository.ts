import { Song } from "../entities/Song";

export interface ISongsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<Song[]>;
    findById(id: number ): Promise<Song[]>;
    save(song: Song): Promise<void>;
    delete(id: number ): Promise<void>;
    upVote(id: number): Promise<void>;
    downVote(id: number): Promise<Song[]>;
    fetchAboveScore10():Promise<Song[]>;
    fetchBelowScore10():Promise<Song[]>;
}