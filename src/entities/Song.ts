export class Song {
    public readonly id: string;

    public name: string;
    public youtubeLink: string;
    public readonly score: number;
    constructor (props: Omit<Song, "id"|"score">, id?: number, score?: number){
        Object.assign(this, props);
    }
}