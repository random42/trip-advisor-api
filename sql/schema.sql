CREATE SCHEMA `trip_advisor`;

CREATE TABLE `trip_advisor`.user (
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	username             varchar(100)  NOT NULL UNIQUE,
	password             varchar(100)  NOT NULL
);

CREATE TABLE `trip_advisor`.restaurant (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	name                varchar(100)  NOT NULL  ,
	avgPrice            float NOT NULL   ,
	maxDiscount        	int  NOT NULL ,
	menuName            varchar(100)  NOT NULL    ,
	menuLastModified   	date NOT NULL
 );

CREATE TABLE `trip_advisor`.restaurant_booking (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
 userId               int UNSIGNED NOT NULL,
 restaurant           int UNSIGNED NOT NULL,
 FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
 FOREIGN KEY ( userId ) REFERENCES `trip_advisor`.user( id ) ON DELETE CASCADE ON UPDATE CASCADE
);

 CREATE TABLE `trip_advisor`.user_favourite (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
 	userId               int UNSIGNED NOT NULL,
 	restaurant           int UNSIGNED NOT NULL,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ( userId ) REFERENCES `trip_advisor`.user( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE (userId, restaurant)
 );

 CREATE TABLE `trip_advisor`.food_need (
	 id                   int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	 need                 varchar(100)  NOT NULL UNIQUE
 );

CREATE TABLE `trip_advisor`.set_menu (
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	name                 varchar(100)  NOT NULL    ,
	description          varchar(100)   ,
	price                float NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE `trip_advisor`.feedback (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	userId              int UNSIGNED NOT NULL    ,
	rating               int UNSIGNED NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ( userId ) REFERENCES `trip_advisor`.user( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CHECK (rating <= 5),
	UNIQUE (userId, restaurant)
 );

CREATE TABLE `trip_advisor`.menu_entry (
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	name                 varchar(100)  NOT NULL    ,
	price                float NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE `trip_advisor`.opinion (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	userId              int UNSIGNED NOT NULL    ,
	rating               int UNSIGNED NOT NULL    ,
	opinion              varchar(10000)  NOT NULL    ,
	FOREIGN KEY ( userId ) REFERENCES `trip_advisor`.user( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	CHECK (rating <= 10),
	UNIQUE (userId, restaurant)
 );

CREATE TABLE `trip_advisor`.rating (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	userId              int UNSIGNED NOT NULL    ,
	rating               int UNSIGNED NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ( userId ) REFERENCES `trip_advisor`.user( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CHECK (rating <= 10),
	UNIQUE (userId, restaurant)
 );

CREATE TABLE `trip_advisor`.restaurant_image (
	id                   int UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	image                varchar(1000)  NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE `trip_advisor`.restaurant_tag (
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	restaurant           int UNSIGNED NOT NULL    ,
	tag                  varchar(100)  NOT NULL    ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE (restaurant, tag)
 );

CREATE TABLE `trip_advisor`.restaurant_food_need (
	id                  int UNSIGNED NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	need               	int UNSIGNED NOT NULL  ,
	restaurant          int UNSIGNED NOT NULL  ,
	FOREIGN KEY ( restaurant ) REFERENCES `trip_advisor`.restaurant( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY ( need ) REFERENCES `trip_advisor`.food_need( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE (need, restaurant)
);
