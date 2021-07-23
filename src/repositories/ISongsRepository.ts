import { Song } from "../entities/Song";

export interface ISongsRepository {
    findByYoutubeLink(youtubeLink: string ): Promise<Song[]|null>;
    findById(id: number ): Promise<Song[]|null>;
    save(song: Song): Promise<void>;
    delete(id: number ): Promise<void>;
    upVote(id: number): Promise<void>;
    downVote(id: number): Promise<Song[]|null>;
    fetchAboveScore10():Promise<Song[]|null>;
    fetchBelowScore10():Promise<Song[]|null>;
    fetchTopSongs(amount:number):Promise<Song[]|null>;
}