# sss-app-backend
This repository will host the files for the backend of the Student Survey and Support app alongside the Environment images required for deployment

## Environment
This uses both nodejs and Docker 

### Services
Docker is used to run a web service and a mySQL service and those are dockerized using the docker-compose file

###Running

You will require to have the Docker Application installed so that you can use the docker server for the containers

- To run use `docker-compose build --no-cache ` then run `docker-compose up` to have all the services running inside a container for your use
- Go to localhost://5000 as that is the port the application is listening on
- Change the environment variables to use a different db alter the ./database/dump.sql file to add structure to the relational database you are using
