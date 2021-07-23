import { Song } from "../entities/Song";
import { PostgresSongsRepository } from "../repositories/PostgresSongsRepository";
import { IVoteSongServiceDTO } from "./IVoteSongServiceDTO";

export class VoteSongService { 
    
    async execute(data: IVoteSongServiceDTO) {
        let status:number;

        try{
            const {id, voteType} = data;
            const possibleVoteTypes:string[] = ["upvote","downvote"]
            
            if(typeof(id) !== "number" || !id){
                status = 404;
                return status;
            }

            if (!possibleVoteTypes.includes(voteType)){
                status = 400;
                return status;
            }

            const songsRepository = new PostgresSongsRepository();
            const isValidSongId = await songsRepository.findById(id);
    
            if (!isValidSongId){
                status = 404;
                return status;
            };
            
            if (voteType === "upvote"){
                await songsRepository.upVote(id);
            };

            if (voteType === "downvote"){
                const songs: Song[] = await songsRepository.downVote(id);
                if (songs[0].score < -4){
                    await songsRepository.delete(id);
                };
            };
           
            status = 200;
            return status;
        }catch (err){
            status = 500;
            console.log(err);
            return status;
        };
    };
};

