const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const dbClient = require("./db/dbConnection");
const GraphSchema = require("./graphql/graphSchema");

const PORT = process.env.PORT || 8080;

dbClient.connect();

const app = express();

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_REQUEST_ORIGIN || "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});

app.use(
  "/api",
  graphqlHTTP({
    schema: GraphSchema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
