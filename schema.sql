create database bamazon;
use bamazon;

create table products (
	itemid integer auto_increment not null,
	productname varchar(45) not null,
	departmentname varchar(45) not null,
	price decimal(10, 4) not null,
	stockquantity integer(10) not null,
	primary key (itemid)
);

INSERT INTO products(productname,departmentname,price,stockquantity)
VALUES ("Uncharted 4", "VideoGames",49.95,150),
	("Doom","Video Games",59.99,200),
	("Crate of Spam","Food and Drink",24.50,50);
	
SELECT * FROM bamazon.products;
	
