const authResolver = require("./auth.resolvers")

const rootResolver = {
    ...authResolver
}

module.exports = rootResolver