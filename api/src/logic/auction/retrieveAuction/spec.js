require('dotenv').config()

const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Auction } = require('../../../models')
const { NotFoundError } = require('errors')
const  retrieveAuction = require('.')

const { MONGO_URL_TEST } = process.env

describe('retrieveAuction', () => {
    beforeAll(() => connect(MONGO_URL_TEST))
    
    beforeEach(() => Promise.all([User.deleteMany(), Auction.deleteMany()]))
    
    it('succeeds on existing user and auction', () => {  // happy path
        
        debugger

        const name = 'arte'
        const lastname = 'sano'
        const email = 'ElArtes@ano.com'
        const password = '123123123'
        const birth = '12-01-2020'
        
        const user = new User({ name, lastname, email, password, birth })

        

        const auction1 = new Auction({
            author: user.id,
            productauthor: "epoxy resin",
            // auctionNumber: Auction.id,
            title: "breakfast table",
            description: "breakfast tray, water and temperature resistant",
            dateForBit: new Date("11/15/2022"),
            value: 15,
            //value: '130€',
            image: "111",
            // createdAt: Date
          });

          const auction2 = new Auction({
            author: user.id,
            productName: "Crafts",
            // auctionNumber: Auction.id,
            title: "artistic lighters",
            description: "Hand-painted lighters, with drawings on request",
            dateForBit: new Date("08/15/2022"),
            value: 5,
            //value: '130€',
            image: "111",
            // createdAt: Date
          });
          

        return Promise.all([ 
            user.save(),
            auction1.save(), // create() -> new, save()
            auction2.save()
        ])
        

            .then(([user, auction1, auction2]) =>
                retrieveAuction(user.id)
                    .then(auctions => {
                        expect(auctions).toHaveLength(2)

                        const _auction1 = auctions.find(auction => auction._id === auction1.id)
                        expect(_auction1).toBeDefined()
                        expect(_auction1.user).toBeUndefined()
                        expect(_auction1.productName).toEqual(auction1.productName)
                        expect(_auction1.title).toEqual(auction1.title)
                        expect(_auction1.description).toEqual(auction1.description)
                        expect(_auction1.dateForBit).toEqual(auction1.dateForBit)
                        expect(_auction1.value).toEqual(auction1.value)
                        expect(_auction1.image).toEqual(auction1.image)

                        const _auction2 = notes.find(auction => auction._id === auction2.id)
                        expect(_auction2).toBeDefined()
                        expect(_auction2.user).toBeUndefined()
                        expect(_auction2.productName).toEqual(auction2.productName)
                        expect(_auction2.title).toEqual(auction2.title)
                        expect(_auction2.description).toEqual(auction2.description)
                        expect(_auction2.dateForBit).toEqual(auction2.dateForBit)
                        expect(_auction2.value).toEqual(auction2.value)
                        expect(_auction2.image).toEqual(auction2.image)

                    })
            )
    })

    it('fails on non-existing user', () => {  // unhappy path
        const userId = new ObjectId().toString()

        return retrieveAuction(userId)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with id ${userId} not found`)
            })
    })

    afterAll(() => disconnect())
})