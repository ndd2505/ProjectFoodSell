drop database testuser;
create database testuser;
 
use testuser;

create table usertab (
	id int auto_increment primary key,
	username nvarchar(50) ,
    password nvarchar(50),
    hoten nvarchar(50),
    email nvarchar(50)
);
 insert into usertab values (null,'bi','321','Phan Van Bi','bipv@gmail.com');
 insert into usertab values (null,'gai','abc','Le Thi Gai','gailt@gmail.com');
 insert into usertab values (null,'teo','123','Nguyen Van Teo','teonv@gmail.com');
 insert into usertab values (null,'duy','2505','Nguyen Dinh Duy','duy2551999@gmail.com');
 select count(*) from usertab 
 
