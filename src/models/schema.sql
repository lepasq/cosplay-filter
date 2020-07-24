SET FOREIGN_KEY_CHECKS=OFF;
DROP TABLE IF EXISTS Cosplay.Character;
DROP TABLE IF EXISTS Cosplay.Tag;
SET FOREIGN_KEY_CHECKS=ON;


CREATE TABLE IF NOT EXISTS Cosplay.Character (
                                         id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(40) NOT NULL,
                                         genre VARCHAR(10) NOT NULL,
                                         title VARCHAR(60) NOT NULL,
                                         gender VARCHAR(20) NOT NULL,
                                         eyecolor VARCHAR(20) NOT NULL,
                                         haircolor VARCHAR(20) NOT NULL,
                                         height VARCHAR(15) NOT NULL,
                                         age SMALLINT,
                                         image VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS Cosplay.Tag (
                                   tag VARCHAR(15) NOT NULL,
                                   cid MEDIUMINT NOT NULL,
                                   FOREIGN KEY(cid)
                                       REFERENCES Cosplay.Character(id)
);


ALTER TABLE Cosplay.Tag
    ADD FULLTEXT INDEX cosplay_fulltext(tag);

INSERT INTO Cosplay.Character (name, genre, title, gender, eyecolor, haircolor, height, age, image) VALUES ('Mario', 'Gaming', 'Super Mario Bros', 'Male', 'blue', 'brown', 'short', null, 'https://i.computer-bild.de/imgs/4/7/9/4/0/8/6/Super-Mario-Daumen-hoch-745x745-afbfad29f38ce2d0.jpg'),
('Luigi', 'Gaming', 'Super Mario Bros', 'male', 'blue', 'brown', 'tall', 25, 'https://lh5.ggpht.com/-oECCOo84iYc/URQ_I-Lp5wI/AAAAAAAA_c0/1m2AOSliE2g/luigi%25252030th%252520birthday%25252001b_thumb%25255B2%25255D.jpg?imgmax=800');


INSERT INTO Cosplay.Tag (tag, cid) VALUES ('cap', 1),
('red', 1),
('nintendo', 1),
('gaming', 1),
('luigi', 1),
('mario', 2),
('cap', 2),
('gaming', 2),
('nintendo', 2);
