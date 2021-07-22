import { Song } from "../entities/Song";
import { IAddSongServiceDTO } from "./IAddSongServiceDTO";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";

export class AddSongService {
    
    async execute(data: IAddSongServiceDTO) {
        try{
            const songsRepository = new PostgresSongsRepository();
            const songAlreadyExists = await songsRepository.findByYoutubeLink(data.youtubeLink);
            let status:number;
    
            if (songAlreadyExists){
                status = 409
                return status;
            };
    
            const song = new Song(data);
    
            await songsRepository.save(song);
            status = 201
            return status;
        }catch (err){
            console.log(err);
        }
    }
}

