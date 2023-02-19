require('dotenv').config()

const {connect, disconnect, Types: { ObjectId }} = require("mongoose");
const { User, Auction } = require("../../../models");
const { NotFoundError } = require("errors");
const createAuction = require(".");
const { env : {MONGO_URL_TEST}} = process


describe("createAuction", () => {
  beforeAll(() => connect(MONGO_URL_TEST));

  beforeEach(() => Promise.all([User.deleteMany(), Auction.deleteMany()]));

  it("succeeds on correct Auction push", () => {  // happy path
  
    const name = "art";
    const lastname = "attack"
    const email = "art@attack.com";
    const password = "123123123";
    const birth = "1990/11/04"

    return User.create( { name, lastname, email, password, birth } )
    .then((user) => {
      const auction = {
        author: user._id.toString(),
        title: "Barra de resina epoxica",
        description: "Mesa de resina epoxica, con acabado de marmol",
        value: 450,
        image: "https://mesasepoxi.com/wp-content/uploads/2021/10/mesaepoxi.com-mesas-de-resina-epoxy-madera-nogal-olivo.jpg",
        // initialDate: new Date("05/10/2022"),
        finalDate: new Date("07/10/2020")
      };

      return createAuction(auction)
        .then((res) => {
          expect(res).toBeUndefined();

          return Auction.find();
        })
        .then((auctions) => {
          expect(auctions).toHaveLength(1);

          const [_auction] = auctions;

          expect(_auction.author.toString()).toEqual(user.id.toString());
          expect(_auction.title).toEqual(auction.title);
          expect(_auction.description).toEqual(auction.description);
          expect(_auction.value).toEqual(auction.value);
          expect(_auction.image.toString()).toEqual(image.toString())
          expect(_auction.finalDate).toBeInstanceOf(Date);
          expect(_auction.initialDate).toBeInstanceOf(Date);
        });
    });
  });

  it("fails on non-existing user", () => {
    // unhappy path
    const userId = new ObjectId().toString();

    return createAuction(userId)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toEqual(`user with id ${userId} not found`)
        })

    // return expect(createAuction(userId)).rejects.toThrowError(NotFoundError,`user with id ${userId} not found`);
  });


  afterAll(() => disconnect());
});
