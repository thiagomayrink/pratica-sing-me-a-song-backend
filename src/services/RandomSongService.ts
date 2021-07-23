import { Song } from "../entities/Song";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";
import { pickRandomSong, randomInteger } from "../utils/utils";

export class RandomSongService {
    
    async execute(): Promise<{status:number, randomSong:Song|""}> {
        const songsRepository = new PostgresSongsRepository;

        try{
            let status:number;

            const songsAboveScore10 = await songsRepository.fetchAboveScore10();
            const songsBelowScore10 = await songsRepository.fetchBelowScore10();
            let randomSong:Song|"";

            if ((songsAboveScore10.length === 0) && (songsBelowScore10.length === 0)){
                status = 404;
                return {status, randomSong};
            };
            
            if (songsAboveScore10.length === 0){
                randomSong = (pickRandomSong(songsBelowScore10));
                status = 200;
                return {status, randomSong};
            };

            if (songsBelowScore10.length === 0){                
                randomSong = (pickRandomSong(songsAboveScore10));
                status = 200;
                return {status, randomSong};
            };
            
            if (randomInteger(0,10)>3){
                randomSong = (pickRandomSong(songsAboveScore10));
                status = 200;
                return {status, randomSong};
            } else {
                randomSong = (pickRandomSong(songsBelowScore10));
                status = 200;
                return {status, randomSong};
            }
        }catch (err){
            console.log(err);
        };
    };
};
