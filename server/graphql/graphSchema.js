const graphql = require("graphql");
const QueryRoot = require("./queryRoot");
const MutationRoot = require("./mutationRoot");

const GraphSchema = new graphql.GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

module.exports = GraphSchema;
