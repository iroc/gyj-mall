/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50548
Source Host           : localhost:3306
Source Database       : mall

Target Server Type    : MYSQL
Target Server Version : 50548
File Encoding         : 65001

Date: 2016-06-01 23:19:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO `carts` VALUES ('4', '1', '2', '2');
INSERT INTO `carts` VALUES ('5', '1', '6', '2');
INSERT INTO `carts` VALUES ('7', '1', '7', '1');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '家用电器');
INSERT INTO `categories` VALUES ('2', '手机、数码、爱购通信');
INSERT INTO `categories` VALUES ('3', '电脑、办公');
INSERT INTO `categories` VALUES ('4', '家居、家具、家装、厨具');
INSERT INTO `categories` VALUES ('5', '男装、女装、童装、内衣');
INSERT INTO `categories` VALUES ('6', '个护化妆、清洁用品、宠物');
INSERT INTO `categories` VALUES ('7', '鞋靴、箱包、珠宝、奢侈品');
INSERT INTO `categories` VALUES ('8', '运动户外、钟表');
INSERT INTO `categories` VALUES ('9', '汽车、汽车用品');
INSERT INTO `categories` VALUES ('10', '母婴、玩具乐器');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `imagefile` varchar(200) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `description` text,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', '乐视（Le）乐2（X620）32GB 金色 移动联通电信4G手机 双卡双待', 'https://img11.360buyimg.com/n7/jfs/t2767/310/1741339439/169695/da88d8c5/574819cbNd280e8cf.jpg', '1099.00', null, '2');
INSERT INTO `products` VALUES ('2', 'Apple iPhone 6s Plus (A1699) 64G 金色 移动联通电信4G手机', 'https://img13.360buyimg.com/n7/jfs/t2302/16/135479564/94882/c76da045/55f0e877N3c24faa3.jpg', '6199.00', null, '2');
INSERT INTO `products` VALUES ('3', 'Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机', 'https://img13.360buyimg.com/n7/jfs/t2461/281/145335373/97081/8af73dbf/55f0e80aN532efcae.jpg', '5399.00', null, '2');
INSERT INTO `products` VALUES ('4', 'Apple iPhone 6 (A1586) 16GB 深空灰色 移动联通电信4G手机', 'https://img11.360buyimg.com/n7/jfs/t2188/88/925914987/96325/54a377f0/56374d6dN5110c513.jpg', '3788.00', null, '2');
INSERT INTO `products` VALUES ('5', '摩托罗拉 moto x（x+1）(XT1085) 32GB 天然竹 移动联通电信4G手机 京东自营', 'https://img11.360buyimg.com/n7/jfs/t1333/234/77978809/192933/9c40c3cc/55496595Nff838baf.jpg', '1499.00', null, '2');
INSERT INTO `products` VALUES ('6', 'OPPO R9 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡双待', 'https://img10.360buyimg.com/n7/jfs/t2413/190/2594527265/57444/8045a2c/56e987efN32aa204c.jpg', '2799.00', null, '2');
INSERT INTO `products` VALUES ('7', 'Apple iPhone 5s (A1530) 16GB 金色 移动联通4G手机', 'https://img11.360buyimg.com/n7/jfs/t2365/168/1185439740/249828/68820aeb/564c5465N82d8e969.jpg', '2198.00', null, '2');
INSERT INTO `products` VALUES ('8', '小米 红米Note3 高配全网通版 3GB+32GB 金色 移动联通电信4G手机 双卡双待', 'https://img11.360buyimg.com/n7/jfs/t1867/2/1439211596/245148/86dd100e/56a64cdaNa98ae1c1.jpg', '1199.00', null, '2');
INSERT INTO `products` VALUES ('9', '小米5 全网通 高配版 3GB内存 64GB ROM 白色 移动联通电信4G手机', 'https://img14.360buyimg.com/n7/jfs/t2494/324/1615617468/268135/1677b798/56cd80c5N06181c58.jpg', '2299.00', null, '2');
INSERT INTO `products` VALUES ('10', 'vivo Xplay5 旗舰版 全网通 6GB+128GB 移动联通电信4G手机 双卡双待 香槟金', 'https://img11.360buyimg.com/n7/jfs/t2443/45/2975552355/336361/1ec28cbd/572bf671N87cff702.jpg', '4288.00', null, '2');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin', '15801230123');
INSERT INTO `users` VALUES ('2', 'bbb', 'aaa', 'dsadas');
INSERT INTO `users` VALUES ('3', 'abc', 'aaa', 'dsa');
INSERT INTO `users` VALUES ('4', 'aaa', 'aaa', '1516');
INSERT INTO `users` VALUES ('5', 'haha', '111', 'dsad');
INSERT INTO `users` VALUES ('6', 'abcabc', '123456', '17090086870');
