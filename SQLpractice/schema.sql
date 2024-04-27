CREATE DATABASE library;
USE library;

CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY ,
    s_name  VARCHAR(50) UNIQUE ,
    email  VARCHAR(50) UNIQUE NOT NULL,
    password  VARCHAR(50) UNIQUE
);