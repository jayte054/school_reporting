const { buildSchema } = require("graphql")

module.exports = buildSchema(`

    input CreateUserInput  {
        firstName: String!,
        lastName: String!,
        role: String!,
        email: String!,
        password: String!
    }

    input LoginInput {
        email: String!,
        password: String!
    }

    type AuthData {
        userId: ID!,
        token: String,
        tokenExpiration: Int!
    }

    type User {
        _id: ID!,
        firstName: String!,
        lastName: String!,
        role: String!,
        email: String!,
        password: String!,
    }

    type RootQuery {
        getUsers: [User!]!,
        getUserById(_id: ID!): User!
        userLogin(LoginInput: LoginInput): AuthData!
    }

    type RootMutation {
        createUser(CreateUserInput: CreateUserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation,
    }
`)

// module.exports = SchoolReportsSchema