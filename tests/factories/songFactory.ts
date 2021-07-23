import "../../src/setup";
import { connection } from "../../src/database";

async function createAndReturnSong(name?:string, youtubeLink?: string, score?:number) {
    
    const song = {
        name: name||"Tocando em Frente - Almir Sater",
        youtubeLink: youtubeLink||"https://youtube.com/watch?v=y5RNbKh9ZRQ",
        score: score||0
    };
    
    const {rows} = await connection.query(`
        INSERT INTO songs 
        (name, "youtubeLink", score) 
        VALUES ($1,$2,$3)
        RETURNING *`,
        [song.name, song.youtubeLink, song.score]
    );
    return rows[0];
};

async function populateSongsTable() {
    await connection.query(`
        INSERT INTO songs 
        (name, "youtubeLink", score) 
        VALUES 
        ('teste 1','https://www.youtube.com/watch?v=01234567891','20'),
        ('teste 2','https://www.youtube.com/watch?v=01234567892','10'),
        ('teste 3','https://www.youtube.com/watch?v=01234567893','-3'),
        ('teste 4','https://www.youtube.com/watch?v=01234567894','5'),
        ('teste 5','https://www.youtube.com/watch?v=01234567895','30'),
        ('teste 6','https://www.youtube.com/watch?v=01234567896','15'),
        ('teste 7','https://www.youtube.com/watch?v=01234567897','20'),
        ('teste 8','https://www.youtube.com/watch?v=01234567898','3'),
        ('teste 9','https://www.youtube.com/watch?v=01234567899','-4'),
        ('teste 10','https://www.youtube.com/watch?v=01234567890','-2'),
        ('teste 11','https://www.youtube.com/watch?v=11234567890','-4'),
        ('teste 12','https://www.youtube.com/watch?v=21234567890','2')
    `);
};

export { createAndReturnSong, populateSongsTable };