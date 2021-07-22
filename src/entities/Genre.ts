export class Genre {
    public readonly id: string;

    public name: string;
    public readonly score: number;
    constructor (props: Omit<Genre, "id">, id?: string){
        Object.assign(this, props);
    }
}