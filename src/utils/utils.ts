import fetch from "node-fetch";
import { Song } from "../entities/Song";

async function isvalidYoutubeVideoId(id: string) {
    const url = `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
    const { status } = await fetch(url);
    if (status === 404) return false;
    return true;
};

function randomInteger(min:number, max:number): number { 
    return Math.floor(Math.random() * (max - min) + min);
}

function pickRandomSong(songArray:Song[]): Song {
    const minValue:number = 0;
    const maxValue:number = songArray.length;
    const randomIndex = randomInteger(minValue,maxValue);
    return songArray[randomIndex];
}

export {
    isvalidYoutubeVideoId,
    randomInteger,
    pickRandomSong
}