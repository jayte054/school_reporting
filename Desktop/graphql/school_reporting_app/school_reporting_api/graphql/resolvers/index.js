const authResolver = require("./auth.resolvers")
const classResolver = require("./class.resolvers")
const subjectResolver= require("./subject.resolver")
const studentResolver = require("./student.resolver")

const rootResolver = {
    ...authResolver,
    ...classResolver,
    ...subjectResolver,
    ...studentResolver
}

module.exports = rootResolver