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
        ('teste 01','https://www.youtube.com/watch?v=01234567891','20'),
        ('teste 02','https://www.youtube.com/watch?v=01234567892','10'),
        ('teste 03','https://www.youtube.com/watch?v=01234567893','-3'),
        ('teste 04','https://www.youtube.com/watch?v=01234567894','5'),
        ('teste 05','https://www.youtube.com/watch?v=01234567895','30'),
        ('teste 06','https://www.youtube.com/watch?v=01234567896','15'),
        ('teste 07','https://www.youtube.com/watch?v=01234567897','20'),
        ('teste 08','https://www.youtube.com/watch?v=01234567898','3'),
        ('teste 09','https://www.youtube.com/watch?v=01234567899','-4'),
        ('teste 10','https://www.youtube.com/watch?v=01234567890','-2'),
        ('teste 11','https://www.youtube.com/watch?v=11234567890','-4'),
        ('teste 12','https://www.youtube.com/watch?v=21234567890','2'),
        ('teste 13','https://www.youtube.com/watch?v=31234567891','20'),
        ('teste 14','https://www.youtube.com/watch?v=41234567892','10'),
        ('teste 15','https://www.youtube.com/watch?v=51234567893','-3'),
        ('teste 16','https://www.youtube.com/watch?v=61234567894','5'),
        ('teste 17','https://www.youtube.com/watch?v=71234567895','30'),
        ('teste 18','https://www.youtube.com/watch?v=81234567896','15'),
        ('teste 19','https://www.youtube.com/watch?v=91234567897','20'),
        ('teste 20','https://www.youtube.com/watch?v=02234567898','3'),
        ('teste 21','https://www.youtube.com/watch?v=03234567899','-4'),
        ('teste 22','https://www.youtube.com/watch?v=04234567890','-2'),
        ('teste 23','https://www.youtube.com/watch?v=15234567890','-4'),
        ('teste 24','https://www.youtube.com/watch?v=26234567890','2'),
        ('teste 25','https://www.youtube.com/watch?v=27234567890','2')
    `);
};

export { createAndReturnSong, populateSongsTable };