const graphql = require("graphql");
const dbClient = require("../db/dbConnection");
const joinMonster = require("join-monster");

const User = new graphql.GraphQLObjectType({
  name: "User",
  extensions: {
    joinMonster: {
      sqlTable: "users",
      uniqueKey: "user_id",
    },
  },
  fields: () => ({
    id: {
      type: graphql.GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: "user_id",
        },
      },
    },
    name: {
      type: graphql.GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: "name",
        },
      },
    },
    boards: {
      description: "Boards this user has access to",
      type: graphql.GraphQLList(Board),
      extensions: {
        joinMonster: {
          junction: {
            // name of the table that holds 2 foreing keys
            sqlTable: "boards_members",
            sqlJoins: [
              (userTable, junctionTable, args) =>
                `${userTable}.user_id = ${junctionTable}.user_id`,
              (junctionTable, boardTable, args) =>
                `${junctionTable}.board_id = ${boardTable}.board_id`,
            ],
          },
        },
      },
    },
  }),
});

const Board = new graphql.GraphQLObjectType({
  name: "Board",
  extensions: {
    joinMonster: {
      sqlTable: "boards",
      uniqueKey: "board_id",
    },
  },
  fields: () => ({
    id: {
      type: graphql.GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: "board_id",
        },
      },
    },
    name: {
      type: graphql.GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: "name",
        },
      },
    },
    owner: {
      type: User,
      extensions: {
        joinMonster: {
          sqlJoin: (boardTable, userTable, args) =>
            `${boardTable}.owner = ${userTable}.user_id`,
        },
      },
    },
  }),
});

const Task = new graphql.GraphQLObjectType({
  name: "Task",
  extensions: {
    joinMonster: {
      sqlTable: "tasks",
      uniqueKey: "task_id",
    },
  },
  fields: () => ({
    id: {
      type: graphql.GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: "task_id",
        },
      },
    },
    title: {
      type: graphql.GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: "title",
        },
      },
    },
    description: {
      type: graphql.GraphQLString,
      extensions: {
        joinMonster: {
          sqlColumn: "description",
        },
      },
    },
    severity: {
      type: graphql.GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: "severity",
        },
      },
    },
    column: {
      type: graphql.GraphQLInt,
      extensions: {
        joinMonster: {
          sqlColumn: "board_column",
        },
      },
    },
    board: {
      type: Board,
      extensions: {
        joinMonster: {
          sqlJoin: (tasktable, boardTable, args) =>
            `${tasktable}.board = ${boardTable}.board_id`,
        },
      },
    },
  }),
});


module.exports = {
    Board: Board,
    User: User,
    Task: Task
}