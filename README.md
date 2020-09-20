# Issue Tracking

## SQL Setup

- Run MySQL server
- execute following statements to make a user
    * create user 'issues'@'localhost' IDENTIFIED by 'pass';    
    * create database issue;    
    * grant all privileges on issue.* to 'issues'@'localhost';    
    * ALTER USER 'issues'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';     
        (use if database is not connected)


create table issues (
    title varchar(300) NOT NULL,
    body varchar(3000),
    isopen int(1) DEFAULT(1),
    id int auto_increment primary key
);


insert into issues (
    title, 
    body, 
    isopen
    ) values (
        "hg", 
        "jhfj", 
        0
    );

insert into issues (
    title, 
    body
    ) values (
        "hg", 
        "jhfj"
    );

