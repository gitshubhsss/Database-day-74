CREATE DATABASE fakedata;
USE fakedata;

CREATE TABLE fakeusersInfo(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(50) UNIQUE
);