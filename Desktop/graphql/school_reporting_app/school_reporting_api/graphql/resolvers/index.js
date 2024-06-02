const authResolver = require("./auth.resolvers")
const classResolver = require("./class.resolvers")
const subjectResolver= require("./subject.resolver")

const rootResolver = {
    ...authResolver,
    ...classResolver,
    ...subjectResolver
}

module.exports = rootResolver