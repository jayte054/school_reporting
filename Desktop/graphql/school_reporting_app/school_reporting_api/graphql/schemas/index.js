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
        address: String!
        father: String
        fatherPhoneNumber: String
        fatherEmail: String
        mother: String
        motherPhoneNumber: String
        motherEmail: String
    }

    type Subjects {
        _id: ID!
        subjectName: String
        assignments: Int
        classWork: Int
        test: Int
        exam: Int
        totalScore: Int
    }

    type StudentGrade {
        _id: ID!
        studentName: String!
        className: String!
        subjects: [Subjects!]!
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

    type Subscription {
        messageRecieved(userId: ID!): String
    }

    type MessageResponse {
        messageId: ID
        success: Boolean
    }

    type Message {
        messageId: ID!
        body: String
    }

    input sendMessageInput {
        senderUserId: String!
        recipientUserId: String!
        messageBody: String!
    }

    input recieveMessageInput {
        userId : ID!
        maxMessages: Int = 1
    }

    input SubjectsInput {
        subjectName: String
        assignments: Int
        classWork: Int
        test: Int
        exam: Int
    }

    input StudentGradeInput {
        studentName: String!
        className: String!
        subjects: [SubjectsInput!]!
    }

    input updateStudentGradeInput {
        studentName: String
        className: String
        subjects: [SubjectsInput!]!
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
        father: String
        fatherPhoneNumber: String
        fatherEmail: String
        mother: String
        motherPhoneNumber: String
        motherEmail: String
        address: String!
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
        getStudentGrades: [StudentGrade!]!
        getStudentGradeById(_id: ID!): StudentGrade!
        getStudentGradesByName(studentName: String): StudentGrade!
        receiveMessageFromUser(RecieveMessageInput: recieveMessageInput): [Message!]!
        ReceiveMessageFromUser(RecieveMessageInput: recieveMessageInput): [Message!]!
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
        createStudentGrades(studentGradeInput: StudentGradeInput): StudentGrade!
        updateStudentGrades(_id: ID!, studentGradeInput: updateStudentGradeInput): StudentGrade!
        deleteStudentGrades(_id: ID!): StudentGrade!
        sendMessageToUser(SendMessageInput: sendMessageInput): MessageResponse!
        SendMessageToUser(SendMessageInput: sendMessageInput): MessageResponse!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
        subscription: Subscription
    }
`)

module.exports = SchoolReportsSchema