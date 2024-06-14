const { buildSchema } = require("graphql")
const SchoolReportsSchema = buildSchema(`

    type Topic {
        _id: ID!
        topicTitle: String!
        numberOfWeeks: Int!
        class: String!
        term: String!
    }

    type Subject {
        _id: ID!
        subjectName: String!
        className: String!
        topics: [Topic!]!
    }

    type Grade {
        assignments: Float
        classWork: Float
        test: Float
        exam: Float
    }

    type Student {
        _id: ID!
        firstName: String!
        lastName: String!
        class: String!
        age: Int!
        grades: [Grade]
        score: Float
    }

    

    type Class {
        _id: ID!
        className: String!
        numberOfStudents: Int!
        classTeacher: String!
        classCaptain: String!
        students: [Student]
        subjects: [Subject]
    }

    input TopicInput {
        topicTitle: String
        numberOfWeeks: Int
        class: String
        term: String
    }

    input SubjectInput {
        subjectName: String!
        className: String!
        topics: [TopicInput!]!
    }

    input GradeInput {
        assignments: Float
        classWork: Float
        test: Float
        exam: Float
    }

    input StudentInput {
        firstName: String!
        lastName: String!
        class: String!
        age: Int!
        grades: [GradeInput]
    }

    input updateStudentInput {
        firstName: String
        lastName: String
        class: String
        age: Int
        grades: [GradeInput]
    }

    input ClassInput {
        className: String!
        numberOfStudents: Int!
        classTeacher: String!
        classCaptain: String!   
    }

    input UpdateClassInput {
        className: String
        numberOfStudents: Int
        classTeacher: String
        classCaptain: String 
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
        getTopics: [Topic!]!
        getTopicById(_id: ID!): Topic!
        getSubjects: [Subject!]!
        getSubjectsByClass(className: String): [Subject!]!
        getSubjectById(_id: ID!): Subject!
        getStudents: [Student!]!
        getStudentById(_id: ID!): Student!
        getClasses: [Class!]!
        getClass: Class!
    }

    type RootMutation {
        createUser(CreateUserInput: CreateUserInput): User
        createClass(ClassInput: ClassInput!): Class!
        createTopic(TopicInput: TopicInput): Topic!
        createMultipleTopics(TopicInput: [TopicInput!]!): [Topic!]!
        deleteTopic(_id: ID!): Topic!
        updateTopic1(_id: ID!, TopicInput: TopicInput): Topic!
        updateTopic2(_id: ID!, topicInput: TopicInput): Topic!
        createSubject(subjectInput: SubjectInput!): Subject!
        updateSubject(_id: ID!, subjectInput: SubjectInput!): Subject!
        deleteSubject(_id: ID!): Subject!
        createStudent(studentInput: StudentInput!): Student!
        createBulkStudents(studentInput: [StudentInput!]!): [Student!]!
        updateStudent(_id: ID!, studentInput: updateStudentInput!): Student
        updateClass(_id: ID!, classInput: UpdateClassInput!): Class
    }

    schema {
        query: RootQuery
        mutation: RootMutation,
    }
`)

module.exports = SchoolReportsSchema