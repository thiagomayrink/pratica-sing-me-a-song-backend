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

async function populateSubjectsTable() {
    await connection.query(`
    INSERT INTO subjects (name, term) VALUES 
    ('Cálculo Infinitesimal I', 1),
    ('Computação I', 1),
    ('Fundamentos da Computação Digital', 1),
    ('Números Inteiros e Criptografia', 1),
    ('Sistemas de Informação', 1),
    ('Cálculo Integral e Diferencial II', 2),
    ('Circuitos Lógicos', 2),
    ('Computação II', 2),
    ('Matemática Combinatória', 2),
    ('Organização da Informação', 2),
    ('Álgebra Linear Algorítmica', 3),
    ('Cálculo Integral e Diferencial III', 3),
    ('Computadores e Programação', 3),
    ('Estrutura de Dados', 3),
    ('Linguagens Formais', 3),
    ('Mecânica, Oscilações e Ondas', 3),
    ('Algoritmos e Grafos', 4),
    ('Cálculo Integral e Diferencial IV', 4),
    ('Cálculo Numérico', 4),
    ('Computação Concorrente', 4),
    ('Eletromagnetismo e Ótica', 4),
    ('Arquitetura de Computadores I', 5),
    ('Banco de Dados I', 5),
    ('Compiladores I', 5),
    ('Computadores e Sociedade', 5),
    ('Fundamentos da Engenharia de Software', 5),
    ('Lógica', 5),
    ('Computação Gráfica I', 6),
    ('Estatística e Probabilidade', 6),
    ('Inteligência Artificial', 6),
    ('Programação Linear I', 6),
    ('Avaliação e Desempenho', 7),
    ('Sistemas Operacionais I', 7),
    ('Teleprocessamento e Redes', 8),
    ('Análise Numérica de Equações Diferenciais Parciais I', 0),
    ('Arquitetura de Computadores II', 0),
    ('Computação Algébrica I', 0),
    ('Computação III', 0),
    ('Conhecimento e Inovação', 0),
    ('Desenvolvimento Ágil', 0),
    ('Economia', 0)
    `);
};

export { createAndReturnGenre, populateGenresTable, populateSubjectsTable };