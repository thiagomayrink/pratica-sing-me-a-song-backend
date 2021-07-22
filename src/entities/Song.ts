export class Song {
    public readonly id: string;

    public name: string;
    public youtubeLink: string;
    public score: number;
    constructor (props: Omit<Song, "id"|"score">, id?: string, score?:number){
        Object.assign(this, props);
    }
}