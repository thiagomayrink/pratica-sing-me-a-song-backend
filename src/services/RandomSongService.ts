import { Song } from "../entities/Song";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";

export class RandomSongService {
    
    async execute(): Promise<{status:number, randomSong:Song|""}> {
        const songsRepository = new PostgresSongsRepository;

        function randomInteger(min:number, max:number): number { 
            return Math.floor(Math.random() * (max - min) + min);
        }

        function pickRandomSong(songArray:Song[]): Song {
            const minValue:number = 0;
            const maxValue:number = songArray.length;
            const randomIndex = randomInteger(minValue,maxValue);
            return songArray[randomIndex];
        }

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
