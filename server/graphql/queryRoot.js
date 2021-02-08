const graphql = require("graphql");
const dbClient = require("../db/dbConnection");
const joinMonster = require("join-monster");

const { User, Board, Task } = require("./objectsDef");

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      description: "Ping query, just making sure GraphQL server is running",
      resolve: () => "Hello world!",
    },

    all_users: {
      type: new graphql.GraphQLList(User),
      description: "Returns all users in users table",
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    user: {
      type: User,
      description: "Returns user info and all boards this user has access to",
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (userTable, args, context) => `${userTable}.user_id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return dbClient.query(sql);
        });
      },
    },

    users_on_board: {
      type: new graphql.GraphQLList(User),
      description: "Return all users that have acces to board board_id",
      args: {
        board_id: { type: graphql.GraphQLInt },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "SELECT users.user_id AS id, users.name AS name FROM users JOIN boards_members ON users.user_id = boards_members.user_id WHERE boards_members.board_id = $1",
              [
                args.board_id,
              ]
            )
          ).rows
        } catch (err) {
          throw new Error(`Failed to get users that are members of board ${args.board_id} ${err}`);
        }
      },
    },

    auth: {
      type: User,
      description: "Returns user info and all boards this user has access to",
      args: {
        name: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
      },
      extensions: {
        joinMonster: {
          where: (userTable, args, context) =>
            `${userTable}.name = '${args.name}' AND ${userTable}.password = '${args.password}'`,
        },
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    all_boards: {
      type: new graphql.GraphQLList(Board),
      description:
        "Returns all boards in boards table and their corresponding owners",
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    board: {
      type: User,
      description: "Returns board and its owner",
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (boardTable, args, context) =>
        `${boardTable}.board_id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    boards_owned_by: {
      type: new graphql.GraphQLList(Board),
      description: "Returns all boards owned by user",
      args: { owner: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      extensions: {
        joinMonster: {
          where: (boardTable, args, context, resolveInfo) =>
            `${boardTable}.owner = ${args.owner}`,
        },
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    tasks_on_board: {
      type: new graphql.GraphQLList(Task),
      description: "All tasks that belong to board",
      args: { board_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      extensions: {
        joinMonster: {
          where: (taskTable, args, context, resolveInfo) =>
            `${taskTable}.board = ${args.board_id}`,
        },
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          console.log(sql);
          return dbClient.query(sql);
        });
      },
    },

    task: {
      type: User,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (boardTable, args, context) =>
        `${boardTable}.board_id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return dbClient.query(sql);
        });
      },
    },
  }),
});

module.exports = QueryRoot;
