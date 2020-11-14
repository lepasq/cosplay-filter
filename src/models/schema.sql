SET FOREIGN_KEY_CHECKS=OFF;
CREATE DATABASE IF NOT EXISTS Cosplay;
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
                                                 age VARCHAR(10),
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

SET GLOBAL local_infile = 1;


-- If loading the .csv files does not work, you should
-- check your mysql configuration or import them with
-- some sort of help tools like an IDE

LOAD DATA LOCAL INFILE '/home/addo/Documents/dev/cosplay-filter/src/models/Cosplay_Character.csv'
    INTO TABLE Cosplay.Character
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n';



LOAD DATA LOCAL INFILE '/home/addo/Documents/dev/cosplay-filter/src/models/Cosplay_Tag.csv'
    INTO TABLE Cosplay.Tag
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n';

SET GLOBAL local_infile = 0;
