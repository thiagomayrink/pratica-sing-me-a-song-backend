import { Request, Response } from "express";
import { TopSongService } from "../services/TopSongService";

export class TopSongController {

    async handler (req: Request, res: Response){
        const topSongService = new TopSongService;
        const amount = Number(req.params?.amount);
        
        if (!amount){
            return res.sendStatus(400);
        }
        try{
            const topSongs = await topSongService.execute(amount);
                        
            if (!topSongs){
                return res.send([])
            }

            return res.send(topSongs);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        }
    }
}