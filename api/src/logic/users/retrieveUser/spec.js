require('dotenv').config()

const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User } = require('../../../models')
const { NotFoundError } = require('errors')
const retrieveUser = require('.')

const { MONGO_URL_TEST } = process.env

describe('retrieveUser', () => {
    beforeAll(() => connect(MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {  // happy path
        const name = 'Pepito'
        const lastname = 'Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const birth = '12-01-2020'
        const phoneNumber = '+34 5252 8080'

        return User.create({ name,lastname, email, password, birth, phoneNumber })
            .then(user =>
                retrieveUser(user.id)
                    .then(user => {
                        // expect(user).toBeDefined()
                        expect(user.name).toEqual(name)
                        expect(user.lastname).toEqual(lastname)
                        expect(user.email).toEqual(email)
                        expect(user.password).toBeUndefined()
                        expect(user.birth).toEqual(birth)
                        expect(user.phoneNumber).toEqual(phoneNumber)
                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveUser(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})