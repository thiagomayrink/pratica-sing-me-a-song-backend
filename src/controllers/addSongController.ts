import { Request, Response } from "express";
import { addSongService } from "../services/addSongService";

export class addSongController {
    constructor(
        private addSongService: addSongService
    ){}

    async handle(req: Request, res: Response): Promise<Response>{
        const { name, youtubeLink } = req.body;

        try{
            await this.addSongService.execute({
                name,
                youtubeLink
            });
            
            return res.status(201).send("OK");
        }catch(err){
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        };
    };
};