import { Song } from "../entities/Song";
import { songsRepository } from "../repositories/songsRepository";
import { addSongServiceDTO } from "./addSongServiceDTO";

export class addSongService {
    constructor(
        private songsRepository: songsRepository
    ){}
    async execute(data: addSongServiceDTO) {
        const songAlreadyExists = await this.songsRepository.findByYoutubeLink(data.youtubeLink);

        if (songAlreadyExists){
            throw new Error('Song already Exists!');
        }

        const song = new Song(data);
        
        await this.songsRepository.save(song);
    }
}

