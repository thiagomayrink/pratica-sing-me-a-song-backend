import { Request, Response } from "express";
import { AddGenreService } from "../services/AddGenreService";

export class AddGenreController {
    
    async handle(req: Request, res: Response): Promise<Response>{
        const { name } = req.body;
        
        if (!name){
            return res.sendStatus(400);
        }
        const addGenreService = new AddGenreService();
        let message:string;
        try{
            const status = await addGenreService.execute({
                name
            });

            if (status === 201){
                message = "OK!"
                return res.status(status).send(message);
            }
            if (status === 400){
                return res.sendStatus(400);
            }
            if (status === 409){
                message = "Genre already exists!"
                return res.status(status).send(message);
            }
        }catch(err){
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        };
    };
};
 