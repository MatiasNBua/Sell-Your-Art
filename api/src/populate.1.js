require('dotenv').config()

const { connect, disconnect } = require("mongoose");
const { User, Auction, Bid } = require("./models");

const { env: {MONGO_URL}} = process

connect(MONGO_URL)
  .then(() => {
    console.log("db connected");

    return Promise.all([User.deleteMany(), Auction.deleteMany()]);
  })

  .then(() => {
    const arttatack = new User({
      name: "Art",
      lastname: "Attack",
      email: "artt@atack.com",
      password: "123123123",
      birth: "10/05/1980",
      phoneNumber: "34 2525 0808",
    });

    const sofia = new User({
      name: "Sofia",
      lastname: "Mendez",
      email: "sofia@mendez.com",
      password: "12312123",
      birth: "12/07/1975",
      phoneNumber: "+34 2525 8080",
    });

    const artesano = new User({
      name: "Artes",
      lastname: "Ano",
      email: "ElArtes@ano.com",
      password: "123123123",
      birth: "03/09/1990",
      phoneNumber: "+34 5252 8080",
    });

    const elsahlame = new User({
      name: "Elsah",
      lastname: "Lame",
      email: "elsah@lame.com",
      password: "123123123",
      birth: "09/03/2000",
      phoneNumber: "+34 8800 2255",
    });

    return Promise.all([
      arttatack.save(),
      sofia.save(),
      artesano.save(),
      elsahlame.save(),
    ])
  // })
  //  .then(users => {
  //     const [artattack, sofia, artesano, elsahlame] = users

  .then(([arttatack, sofia, artesano, elsahlame]) => {
    

    const auction1 = new Auction({
      author: arttatack.id,
      title: "Barra de resina epoxica",
      description: "Mesa de resina epoxica , con acabado de marmol",
      value: 450,
      image:
      "https://mesasepoxi.com/wp-content/uploads/2021/10/mesaepoxi.com-mesas-de-resina-epoxy-madera-nogal-olivo.jpg",
      finalDate: new Date("05/10/2022"),
      bids: [],
    });

    const auction2 = new Auction({
      author: sofia.id,
      title: "Porta Sahumerio",
      description: "Mesa de resina epoxica , con acabado de marmol",
      finalDate: new Date("09/15/2022"),
      value: 10,
      image: "111",
      bids: [],
    });

    const auction3 = new Auction({
      author: artesano.id,

      title: "breakfast table",
      description: "breakfast tray, water and temperature resistant",
      finalDate: new Date("11/15/2022"),
      value: 15,
      image: "111",
      bids: [],
    });

    const auction4 = new Auction({
      author: elsahlame.id,
      title: "artistic lighters",
      description: "Hand-painted lighters, with drawings on request",
      finalDate: new Date("08/15/2022"),
      value: 5,
      image: "111",
      bids: [],
      
      // createdAt: Date
    });

    return Promise.all([
      auction1.save(),
      auction2.save(),
      auction3.save(),
      auction4.save(),
    ]).then(([auction1, auction2, auction3, auction4]) => {
      const bid = new Bid({
          user: sofia._id,
          price: 130,
          dateBid: Date.now()
      })
      
      const bid1 = new Bid({
        user: arttatack.id,
        price: 20,
        date: Date.now(),
      });
    
      const bid2 = new Bid({
        user: elsahlame.id,
        price: 200,
        date: Date.now(),
      }); 

      return Promise.all([
        bid.save(),
        bid1.save(),
        bid2.save(),
      ]).then(([bid, bid1, bid2]) => {

      auction1.bids[auction1.bids.length] = bid
      auction1.bids[auction1.bids.length] = bid1
      auction1.bids[auction1.bids.length] = bid2

      auction2.bids[auction2.bids.length] = bid
      auction2.bids[auction2.bids.length] = bid1
      auction2.bids[auction2.bids.length] = bid2

      auction3.bids[auction3.bids.length] = bid
      auction3.bids[auction3.bids.length] = bid1
      auction3.bids[auction3.bids.length] = bid2

      return Promise.all([
        auction1.save(),
        auction2.save(),
        auction3.save(),
      ])
  })
})
  })
  })
  .catch((error) => {
    console.log(`there was an error. Message: ${error.message}`);
  })
  .then(() => disconnect());


   