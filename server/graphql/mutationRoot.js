const graphql = require("graphql");
const dbClient = require("../db/dbConnection");
const joinMonster = require("join-monster");
const { User, Board, Task } = require("./objectsDef");

const MutationRoot = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    add_board: {
      type: Board,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        owner: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "INSERT INTO boards (name, owner) VALUES ($1, $2) RETURNING *",
              [args.name, args.owner]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to insert new board ${err}`);
        }
      },
    },
    add_user: {
      type: User,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING user_id as id, name",
              [args.name, args.password]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to insert new user ${err}`);
        }
      },
    },
    delete_user: {
      type: User,
      args: {
        id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "DELETE FROM users WHERE user_id = $1 CASCADE",
              [args.id]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to delete user ${err}`);
        }
      },
    },
    remove_user_from_board: {
      type: User,
      args: {
        user_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        board_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "DELETE FROM boards_members WHERE user_id = $1 AND board_id = $2",
              [args.user_id, board_id]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to delete user-board relationship ${err}`);
        }
      },
    },
    add_user_to_board: {
      type: Board,
      args: {
        board: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        user: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "INSERT INTO boards_users (board_id, user_id) VALUES ($1, $2) RETURNING *",
              [args.board, args.user]
            )
          ).rows[0];
        } catch (err) {
          throw new Error("Failed to insert new player");
        }
      },
    },
    add_task: {
      type: Task,
      args: {
        title: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        description: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        severity: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        column: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        board: { type: graphql.GraphQLNonNull(graphql.GraphQLInt)}
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "INSERT INTO tasks (title, description, severity, board_column, board) VALUES ($1, $2, $3, $4, $5) RETURNING task_id as id, title, description, severity, board_column as column",
              [args.title, args.description, args.severity, args.column, args.board]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to insert new user ${err}`);
        }
      },
    },
    move_task: {
      type: Task,
      args: {
        task_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        column: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "UPDATE tasks SET board_column = $1 WHERE task_id = $2 returning task_id as id, title, description, severity, board_column as column",
              [args.column, args.task_id]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to chane task ${args.task_id} column to ${args.column}: ${err}`);
        }
      },
    },
  }),
});

module.exports = MutationRoot;
