const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { users: { updateUserPassword } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    debugger
    runWithErrorHandling(() => {

        const userId = verifyToken(req)

        const { body: { oldPassword, newPassword, newPasswordRepeat} } = req
        
        return updateUserPassword( userId, oldPassword, newPassword, newPasswordRepeat )
            .then(()=> res.status(204).send())
    }, res, logger)
}