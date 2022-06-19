create database shanotes;
create user shanotes@'localhost' identified by 'shanotes';
grant all on shanotes.* to shanotes@'localhost' identified by 'shanotes';
use shanotes;

create table user(
  id int primary key auto_increment,
  name varchar(200) unique,
  password varchar(200),
  access int
);

create table link (
  id int primary key auto_increment,
  parent int,
  link_type int,
  title varchar(200),
  content text,
  author int,
  create_time datetime default now(),
  update_time datetime default now(),
  foreign key (author) references user(id) on delete cascade
);

