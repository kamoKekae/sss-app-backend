# Copy latest Mysql Base Image from DockerHub
FROM mysql 

# Default port for mysql
EXPOSE 3306 

# Script to be executed when mysql-server is started 
COPY ./dump.sql /docker-entrypoint-initdb.d/



