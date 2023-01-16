const { User } = require('../../../models')
const { DuplicityError, SystemError } = require('errors')
const { validateText, validateEmail, validatePassword, validateDate, validateString } = require('validators')


function registerUser(name, lastname, email, password, birth, phonenumber) {
    validateText(name, 'name')
    validateText(lastname, 'lastname')
    validateEmail(email)
    validatePassword(password)
    validateDate(birth)
    validateString(phonenumber, 'phonenumber')
    
    return (async () => {
        try {
            await User.create({ name, lastname, email, password, birth, phonenumber })
        } catch (error) {
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}

module.exports = registerUser