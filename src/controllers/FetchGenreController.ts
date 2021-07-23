import { Request, Response } from "express";
import { FetchGenreService } from "../services/FetchGenreService";

export class FetchGenreController {

    async handler (req: Request, res: Response){
        const fetchGenreService = new FetchGenreService();
        
        try{
            const genres = await fetchGenreService.execute();
                        
            if (!genres){
                return res.send([]);
            }

            return res.send(genres);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        }
    }
}