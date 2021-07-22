export class Song {
    public readonly id: number;

    public name: string;
    public youtubeLink: string;
    public score: number;
    public genres: number[];
    
    constructor (props: Omit<Song, "id"|"score"|"genres">, id?: number, score?:number, genres?: number[]){
        Object.assign(this, props);
    }
}