export class Genre {
    public readonly id: number;

    public name: string;
    public score: number;

    constructor (props: Omit<Genre, "id"|"score">, id?: number, score?: number){
        Object.assign(this, props);
    }
}