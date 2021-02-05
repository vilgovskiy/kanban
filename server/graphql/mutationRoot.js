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
          // First need to add board to boards table
          newBoardRecord = await dbClient.query(
            "INSERT INTO boards (name, owner) VALUES ($1, $2) RETURNING board_id as id, name",
            [args.name, args.owner]
          );
          if (newBoardRecord.rows.length < 1)
            throw new Error(`Could not create board ${args.name}`);

          // Now need to add new board and its owner to boards_members relations
          await dbClient.query(
            "INSERT INTO boards_members (board_id, user_id) VALUES ($1, $2)",
            [newBoardRecord.rows[0].id, args.owner]
          );
          console.log("created new board")
          return newBoardRecord.rows[0];
        } catch (err) {
          throw new Error(`Failed to insert new board ${err}`);
        }
      },
    },
    delete_board: {
      type: Board,
      args: {
        id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt)}
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "DELETE FROM boards WHERE board_id = $1",
              [args.id]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to delete board ${err}`);
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
              "DELETE FROM users WHERE user_id = $1",
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
      type: User,
      args: {
        board: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        user: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          var userRecord = await dbClient.query(
            "SELECT user_id FROM users WHERE name = $1",
            [args.user]
          );
          if (userRecord.rows.length < 1) {
            throw new Error(`User ${args.user} does not exist`);
          }
          return (
            await dbClient.query(
              "INSERT INTO boards_members (board_id, user_id) VALUES ($1, $2) RETURNING board_id, user_id as id",
              [args.board, userRecord.rows[0].user_id]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(`Failed to add user to board ${args.board}: ${err}`);
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
        board: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await dbClient.query(
              "INSERT INTO tasks (title, description, severity, board_column, board) VALUES ($1, $2, $3, $4, $5) RETURNING task_id as id, title, description, severity, board_column as column",
              [
                args.title,
                args.description,
                args.severity,
                args.column,
                args.board,
              ]
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
          throw new Error(
            `Failed to chane task ${args.task_id} column to ${args.column}: ${err}`
          );
        }
      },
    },
  }),
});

module.exports = MutationRoot;
