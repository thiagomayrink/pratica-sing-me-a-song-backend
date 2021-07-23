import "../../src/setup";
import { connection } from "../../src/database";

async function createAndReturnGenre(name?:string, score?:number) {
    
    const genre = {
        name: name||"test_genre",
        score: score||0
    };
    
    const {rows} = await connection.query(`
        INSERT INTO genres 
        (name, score) 
        VALUES ($1,$2)
        RETURNING *`,
        [genre.name, genre.score]
    );
    return rows[0];
};

async function populateGenresTable() {
    await connection.query(`
        INSERT INTO genres 
        (name, score) 
        VALUES 
        ('genre test 01','20'),
        ('genre test 02','10'),
        ('genre test 03','-3'),
        ('genre test 04','5'),
        ('genre test 05','30'),
        ('genre test 06','15'),
        ('genre test 07','20'),
        ('genre test 08','3'),
        ('genre test 09','-4'),
        ('genre test 10','-2'),
        ('genre test 11','-4'),
        ('genre test 12','2'),
        ('genre test 13','20'),
        ('genre test 14','10'),
        ('genre test 15','-3'),
        ('genre test 16','5'),
        ('genre test 17','30'),
        ('genre test 18','15'),
        ('genre test 19','20'),
        ('genre test 20','3'),
        ('genre test 21','-4'),
        ('genre test 22','-2'),
        ('genre test 23','-4'),
        ('genre test 24','2'),
        ('genre test 25','2')
    `);
};

export { createAndReturnGenre, populateGenresTable };