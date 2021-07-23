import { Request, Response } from "express";
import { VoteSongService } from "../services/VoteSongService";

export class VoteSongController {
    
    async handle(req: Request, res: Response): Promise<Response>{
        const { id:rawId, voteType } = req.params;
        
        if (!rawId || !voteType) {
            return res.sendStatus(400);
        };

        const id = Number(rawId);
        const voteSongService = new VoteSongService();
        let message:string;

        try{
            const status = await voteSongService.execute({
                id,
                voteType
            });
            
            if (status === 200){
                message = "OK!";
                return res.status(status).send(message);
            };
            if (status === 400){
                return res.sendStatus(400);
            };
            if (status === 404){
                message = "Invalid Song id!";
                return res.status(status).send(message);
            };
            if (status === 500){
                message = "Unexpected Error.";
                return res.status(status).send(message);
            };
        }catch(err){
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        };
    };
};
 