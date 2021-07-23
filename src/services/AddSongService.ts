import { Song } from "../entities/Song";
import { IAddSongServiceDTO } from "./IAddSongServiceDTO";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";
import { isvalidYoutubeVideoId } from "../utils/utils";


export class AddSongService {
    
    async execute(data: IAddSongServiceDTO) {
        try{
            let status:number;

            const videoId:string = data.youtubeLink?.split("v=")[1]?.substring(0, 11);
            if(!await isvalidYoutubeVideoId(videoId)){
                status = 400;
                return status;
            };

            const songsRepository = new PostgresSongsRepository();
            const songAlreadyExists = await songsRepository.findByYoutubeLink(data.youtubeLink);
            
    
            if (songAlreadyExists){
                status = 409;
                return status;
            };
    
            const song = new Song(data);
    
            await songsRepository.save(song);
            status = 201;
            return status;
        }catch (err){
            console.log(err);
        };
    };
};

