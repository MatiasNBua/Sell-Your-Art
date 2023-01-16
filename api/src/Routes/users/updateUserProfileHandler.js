const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { users: { updateUserProfile } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {

        const userId = verifyToken(req)

        const { body: { gender, city, aboutYou } } = req

        return updateUserProfile( userId, gender, city, aboutYou )
            .then(()=> res.status(204).send())
    }, res, logger)
}