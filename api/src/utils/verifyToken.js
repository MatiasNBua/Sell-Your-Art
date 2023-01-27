const { verify } = require('jsonwebtoken')
const { validateText } = require('validators')


// const { JWT_SECRET } = process.env
const JWT_SECRET = "Dan: copié el código de Mónica!"

function verifyToken(req) {
    const { headers: { authorization } } = req

    validateText(authorization, 'authorization')

    const token = authorization.substring(7)

    const payload = verify(token, JWT_SECRET)

    const { sub: userId } = payload

    return userId
}

module.exports = verifyToken