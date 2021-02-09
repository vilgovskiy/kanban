# KanBan server
This is server application running on Express and Node.js and providing an API Endpoint for KanBan web application.  
The API endpoint is located at `/api` route and uses GraphQL query language to provide access to data stored in PostgreSQL database.

## Requirements
* You will need an instance of PostgreSQL database in order to run this server application. Database component relies on `node-postgres` library to connect to DB instance


## Setup
1. Install all required dependencies
2. Set up your database schema using `schema.sql` file located [here](https://github.com/vilgovskiy/kanban/tree/master/server/db/schema)
3. Set up DB connection via using  
    1. env vars:  
        * `env.DB_URL` - URL address of the Database server  
        * `env.DB_PORT` - Database server port  
        * `env.DB_USER` - Database User  
        * `env.DB_PASSWORD` - Database Password  
        * `env.DB_NAME` - Name of the source Database
    2. Config file in `/server/db`
4. Set allowed request origin as `.env.ALLOWED_REQUEST_ORIGIN`

## Running the server
run `node server.js`  
When server is up and running, it will log port server is running on

## About GraphQL
#### Objects
GraphQL contains definitions of 3 types of object we are working with  
+ User
+ Board
+ Task
These objects are stored as records in the Database and are accessed via queries.  
Every object has a set of fields that can be returned when GraphQL processes a query.

#### Queries
There are 2 types of queries defined for this server:
* Query - retrieve and object or list of objects specified in query definition.  
Can be accessed via HTTP GET request
* Mutation - This type of queries is reqerved for altering stored data. Inserting/Deleting/Updating records, all is done via mutation queries.  
Can be accessed via HTTP POST requests that have JSON body with `query` attribute
