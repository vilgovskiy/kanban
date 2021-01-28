const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const dbClient = require("./db/dbConnection");
const GraphSchema = require("./graphql/graphSchema");

const PORT = process.env.PORT || 8080;

dbClient.connect();

const app = express();
app.use(
  "/api",
  graphqlHTTP({
    schema: GraphSchema,
    graphiql: true,
  })
);

// dbClient.query("INSERT INTO users (name, password) VALUES ('testing', 'testing') RETURNING user_id as id, name").then(resp => console.log(resp))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
