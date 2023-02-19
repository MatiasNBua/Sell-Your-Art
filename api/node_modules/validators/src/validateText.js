const { FormatError } = require('errors')


function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (text.trim().length === 0) throw new FormatError(`${text} is empty or blank`)
}

module.exports = validateText