const { runWithErrorHandling, createLogger } = require('../../utils')
const { users: { registerUser } } = require('../../logic')
const { DuplicityError } = require('errors')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const { body: { name, lastname, email, password, birth, phonenumber } } = req
        
        return registerUser(name, lastname, email, password, new Date(birth), phonenumber)
            .then(() => res.status(201).send())
            .catch(error => {
                if (error instanceof DuplicityError)
                    res.status(409).json({ error: error.message })
                else
                    res.status(500).json({ error: 'system error' })

                logger.error(error)

                return
            })
    }, res, logger)
}