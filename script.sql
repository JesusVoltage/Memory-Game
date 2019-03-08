create database memorygame;

use memorygame;


create table puntuacion(
    id int(3)  not null auto_increment,
    user varchar(50) not null,
    segundos int(5) not null,
    movimientos int(5) not null,
    primary key(id)
);