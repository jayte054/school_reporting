const { buildSchema } = require("graphql")

module.exports = buildSchema(`

    type Topic {
        topicTitle: String!
        numberOfWeeks: Int!
    }

    type Subject {
        subjectName: String!
        topics: [Topic!]!
    }

    type Grade {
        assignments: Float!
        classWork: Float!
        test: Float!
        exam: Float!
    }

    type Student {
        firstName: String!
        lastName: String!
        age: String!
        grades: [Grade!]!
        score: Float!
    }

    type Class {
        className: String!
        numberOfStudents: Int!
        classTeacher: String!
        classCaptain: String!
        students: [Student!]!
        subjects: [Subject!]!
    }

    input TopicInput {
        topicTitle: String!
        numberOfWeeks: Int!
    }

    input SubjectInput {
        subjectName: String!
        topics: [TopicInput!]!
    }

    input GradeInput {
        assignments: Float!
        classWork: Float!
        test: Float!
        exam: Float!
    }

    input StudentInput {
        firstName: String!
        lastName: String!
        age: Int!
        grades: [GradeInput!]!
        score: Float!
    }

    input ClassInput {
        className: String!
        numberOfStudents: Int!
        classTeacher: String!
        classCaptain: String!
        students: [StudentInput!]!
        subjects: [SubjectInput!]!
    }
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
        createClass(ClassInput: ClassInput): Class
    }

    schema {
        query: RootQuery
        mutation: RootMutation,
    }
`)

// module.exports = SchoolReportsSchema