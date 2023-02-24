CREATE database memegen;
CREATE TABLE memes (memeId INT NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(250) NOT NULL, image VARCHAR(500) NOT NULL, memeType INT NOT NULL, PRIMARY KEY (memeId));
CREATE TABLE quotes (quoteId INT NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(250) NOT NULL, quoteContent VARCHAR(400) NOT NULL, quoteType INT NOT NULL, PRIMARY KEY(quoteId));
CREATE TABLE memeTemplate (templateId INT NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(250) NOT NULL, image VARCHAR(500) NOT NULL, memeType INT NOT NULL, PRIMARY KEY(templateId));
CREATE TABLE memeTypes (typeId INT NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(250) NOT NULL, PRIMARY KEY(typeId));