
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

/* Mock Table to test API*/

CREATE TABLE comment(comment_id int , comment varchar(100) );

INSERT INTO comment VALUES(1, "Hello World");

flush privileges;