require('dotenv').config()
const { AuthError } = require('errors')
const { User } = require('../models')
const updateUserProfile = require('.')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { env : {MONGO_URL_TEST}} = process

describe('updateUserProfile', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('Succes on updated profile', () => {  // happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        const gender = 'female'
        const city = 'barcelona'
        const aboutYou = 'ssssssss'

        return User.create({ name, email, password })
            .then(user =>
                updateUserProfile(user: user.id, gender:gender.id, city, aboutYou)
                    .then(userId =>
                        expect(userId).toEqual(user.id)
                        expect(user.gender).toEqual(gender)
                    )
            )
    })


    })

   
   after(() => disconnect())
}