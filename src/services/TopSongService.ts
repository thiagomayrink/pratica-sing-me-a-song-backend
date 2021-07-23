import { Song } from "../entities/Song";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";

export class TopSongService {
    
    async execute(amount : number): Promise<Song[]|null> {
        const songsRepository = new PostgresSongsRepository;

        try{
        const topSongs = await songsRepository.fetchTopSongs(amount);
        
        return topSongs;

        }catch(err){
            console.log(err);
        }
    }
}