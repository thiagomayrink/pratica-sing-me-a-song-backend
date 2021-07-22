export class Genre {
    public readonly id: number;

    public name: string;
    public score: number;

    constructor (props: Omit<Genre, "id">, id?: number){
        Object.assign(this, props);
    }
}