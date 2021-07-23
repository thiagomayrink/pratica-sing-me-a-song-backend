import { Request, Response } from "express";
import { RandomSongService } from "../services/RandomSongService";


export class RandomSongController {
    
    async handle(req: Request, res: Response): Promise<Response>{ 

        const randomSongService = new RandomSongService();
        try{
            const result = await randomSongService.execute();

            if (result.status === 200){
                return res.status(200).send(result.randomSong);
            }
            if (result.status === 404){
                return res.sendStatus(404);
            }

            return;
        }catch(err){
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        };
    };
};
 