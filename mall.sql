CREATE DATABASE IF NOT EXISTS mall;

use mall;

-- 用户表
CREATE TABLE users(
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) UNIQUE,
    phone VARCHAR(50) UNIQUE NOT NULL,
    created_time DATETIME NOT NULL,
    modified_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- 插入用户数据
INSERT INTO users(id,username,password,nickname,phone,created_time)
VALUES(NULL,)

-- 商品表
CREATE TABLE products(
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100) NOT NULL,
    imagefile VARCHAR(200) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    description TEXT
);

-- 商品类别表
CREATE TABLE categories(
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100) NOT NULL
);

-- 购物车表
CREATE TABLE carts(
    id INT PRIMARY KEY auto_increment,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    count INT NOT NULL
);
