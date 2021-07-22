export class Genre {
    public readonly id: string;

    public name: string;
    public readonly score: number;
    constructor (props: Omit<Genre, "id"|"score">, id?: number, score?: number){
        Object.assign(this, props);
    }
}