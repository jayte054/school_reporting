const authResolver = require("./auth.resolvers")
const classResolver = require("./class.resolvers")
const subjectResolver= require("./subject.resolver")
const studentResolver = require("./student.resolver")
const studentGradesResolver = require("./studentGradeResolver")

const rootResolver = {
    ...authResolver,
    ...classResolver,
    ...subjectResolver,
    ...studentResolver,
    ...studentGradesResolver
}

module.exports = rootResolver