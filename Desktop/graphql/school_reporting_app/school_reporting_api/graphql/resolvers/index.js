const authResolver = require("./auth.resolvers")
const classResolver = require("./class.resolvers")
const subjectResolver= require("./subject.resolver")
const studentResolver = require("./student.resolver")
const studentGradesResolver = require("./studentGradeResolver")
const messageResolver = require("./message.resolver")
const messageResolverSocketIo= require("./messageResolverSocketio")

const rootResolver = {
    ...authResolver,
    ...classResolver,
    ...subjectResolver,
    ...studentResolver,
    ...studentGradesResolver,
    ...messageResolver,
    ...messageResolverSocketIo
}

module.exports = rootResolver