const {connect, disconnect, Types: { ObjectId }} = require("mongoose");
const { User, Auction , Bid } = require("../../../models");
const {  } = require("errors");
const createBid = require(".");
const {createAuction, createBid, createUser} = require('../logic')

describe("create Bid", () => {
    beforeAll(() => connect("mongodb://localhost:27017/postits-test"))

    beforeEach(() => Promise.all([User.deleteMany(), Bid.deleteMany()]))

    it("Success on create bid", () => {
        const name = "artattack";
        const email = "art@attack.com";
        const password = "123123123";

        return createUser({ name, email, password })
        .then((user) => {
            const auction = {
              author: user._id.toString(),
              title: "Barra de resina epoxica",
              description: "Mesa de resina epoxica , con acabado de marmol",
              value: 450,
              image: "https://mesasepoxi.com/wp-content/uploads/2021/10/mesaepoxi.com-mesas-de-resina-epoxy-madera-nogal-olivo.jpg",
              initialDate: new Date("05/10/2022"),
              finalDate: new Date("07/10/2020"),
              bid:[]
            };

            return createAuction(auction)
            .then((auction) => {
                const bid = {
                    user: user._id,
                    price: 130,
                    dateBid: new Date(Date.now)
                }

            return createBid(bid).then((bid) =>{
                auction.bid[auction.bid.length] = bid
            })
        })
        })
    });
    afterAll(() => disconnect())
});