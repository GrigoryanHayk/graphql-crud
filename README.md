# Graphql-crud

The simple project based on nodejs and react for adding editing deleting (CRUD) posts after authorization.

## Getting started
The application redirects to `login` or `sing up` form. After authorization you can create update or delete posts
related to authorized user.

## Overview

For User and Posts data is used mongodb.

Mongodb is used for 'Users' and 'Posts' data. 

The project is based from 2 folders clients and server

    The `client` folder contains React.js based front-end application

    The `server` folder contains Nodejs based application

    Graphql is used for retreiving data from mongodb and returns to front-end application
    
## Development server

#### client
Run `npm start` for a dev server. Navigate to `http://localhost:3000` 

#### server
Run `npm run dev` for a dev server. Navigate to `http://localhost:4000/graphql` to open the graphql playground  

Also you need to have mongodb installed to run the full project on local machine.

## Docker Compose
Run `./init.sh` file on Linux or run manually `docker-compose up` to run docker containers with working environment.
See configs in `docker-compose.yml` file.
