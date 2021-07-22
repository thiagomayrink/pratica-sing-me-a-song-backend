import { Song } from "../entities/Song";
import { ISongsRepository } from "../repositories/ISongsRepository";
import { IAddSongServiceDTO } from "./IAddSongServiceDTO";

export class addSongService {
    constructor(
        private songsRepository: ISongsRepository
    ){}
    async execute(data: IAddSongServiceDTO) {
        const songAlreadyExists = await this.songsRepository.findByYoutubeLink(data.youtubeLink);

        if (songAlreadyExists){
            throw new Error('Song already Exists!');
        }

        const song = new Song(data);

        await this.songsRepository.insert(song);
    }
}

