DROP USER IF EXISTS 'test'@'localhost';
CREATE USER 'test'@'localhost' IDENTIFIED BY '__test__';

DROP DATABASE IF EXISTS lw1_test;

CREATE DATABASE lw1_test;
USE lw1_test;

CREATE TABLE fachbegriff(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  modul CHAR(6) NOT NULL,
  begriff VARCHAR(50) NOT NULL,
  erklaerung VARCHAR(100),
  PRIMARY KEY (id)
);

INSERT INTO fachbegriff (modul, begriff, erklaerung) VALUES
("M403", "Datentyp", "eine Komponente der Variablendeklaration"),
("M403", "Variablenname", "eine Komponente der Variablendeklaration"),
("M403", "Parameterliste", "Bestandteil vom Funktionskopf"),
("M403", "Rückgabetyp", "Bestandteil vom Funktionskopf");

GRANT ALL ON lw1_test.* TO 'test'@'localhost';
FLUSH PRIVILEGES;
