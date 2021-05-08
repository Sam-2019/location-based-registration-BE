const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const DataSchema = require("./graphql/schema");
const dotenv = require("dotenv");

require("./db/db");

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", function (req, res) {
  res.end("Learn GraphQL daily");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: DataSchema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(process.env.PORT || 5000);
console.log("GraphQL server up!");
