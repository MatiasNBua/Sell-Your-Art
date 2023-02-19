function validateString(string, explain = 'string') {
    console.log(explain)
    if (typeof string !== 'string') throw new TypeError(`${explain} is not a string`)
}

module.exports = validateString