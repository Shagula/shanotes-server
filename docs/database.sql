create database shanotes;
create user shanotes@'localhost' identified by 'shanotes';
grant all on shanotes.* to shanotes@'localhost' identified by 'shanotes';
use shanotes;
create table user(
  id int primary key,
  name varchar(200),
  password varchar(200),
  access int
);
create table notes (
  id int primary key,
  title varchar(200),
  content text(30000),
  author int, 
  create_time datetime default now(),
  last_update datetime default now(),
  foreign key (author) references user(id) on delete cascade
);

create table notebooks (
  id int primary key,
  title varchar(200),
  sequence varchar(5000), 
  pages int,
  author int,
  create_time datetime default now(),
  last_update datetime default now(),
  foreign key (author) references user(id) on delete cascade
);

create table file (
  
)

create table folder (

);