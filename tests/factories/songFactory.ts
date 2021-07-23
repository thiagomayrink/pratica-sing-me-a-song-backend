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
        ('test 01','https://www.youtube.com/watch?v=01234567891','20'),
        ('test 02','https://www.youtube.com/watch?v=01234567892','10'),
        ('test 03','https://www.youtube.com/watch?v=01234567893','-3'),
        ('test 04','https://www.youtube.com/watch?v=01234567894','5'),
        ('test 05','https://www.youtube.com/watch?v=01234567895','30'),
        ('test 06','https://www.youtube.com/watch?v=01234567896','15'),
        ('test 07','https://www.youtube.com/watch?v=01234567897','20'),
        ('test 08','https://www.youtube.com/watch?v=01234567898','3'),
        ('test 09','https://www.youtube.com/watch?v=01234567899','-4'),
        ('test 10','https://www.youtube.com/watch?v=01234567890','-2'),
        ('test 11','https://www.youtube.com/watch?v=11234567890','-4'),
        ('test 12','https://www.youtube.com/watch?v=21234567890','2'),
        ('test 13','https://www.youtube.com/watch?v=31234567891','20'),
        ('test 14','https://www.youtube.com/watch?v=41234567892','10'),
        ('test 15','https://www.youtube.com/watch?v=51234567893','-3'),
        ('test 16','https://www.youtube.com/watch?v=61234567894','5'),
        ('test 17','https://www.youtube.com/watch?v=71234567895','30'),
        ('test 18','https://www.youtube.com/watch?v=81234567896','15'),
        ('test 19','https://www.youtube.com/watch?v=91234567897','20'),
        ('test 20','https://www.youtube.com/watch?v=02234567898','3'),
        ('test 21','https://www.youtube.com/watch?v=03234567899','-4'),
        ('test 22','https://www.youtube.com/watch?v=04234567890','-2'),
        ('test 23','https://www.youtube.com/watch?v=15234567890','-4'),
        ('test 24','https://www.youtube.com/watch?v=26234567890','2'),
        ('test 25','https://www.youtube.com/watch?v=27234567890','2')
    `);
};

export { createAndReturnSong, populateSongsTable };