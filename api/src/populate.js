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
      phoneNumber: "3425250808",
    });

    const sofia = new User({
      name: "Sofia",
      lastname: "Mendez",
      email: "sofia@mendez.com",
      password: "12312123",
      birth: "12/07/1975",
      phoneNumber: "3425258080",
    });

    const artesano = new User({
      name: "Artes",
      lastname: "Ano",
      email: "ElArtes@ano.com",
      password: "123123123",
      birth: "03/09/1990",
      phoneNumber: "3452528080",
    });

    const elsahlame = new User({
      name: "Elsah",
      lastname: "Lame",
      email: "elsah@lame.com",
      password: "123123123",
      birth: "09/03/2000",
      phoneNumber: "3488002255",
    });

    return Promise.all([
      arttatack.save(),
      sofia.save(),
      artesano.save(),
      elsahlame.save(),
    ]);
  })
  //  .then(users => {
  //     const [artattack, sofia, artesano, elsahlame] = users

  .then(([arttatack, sofia, artesano, elsahlame]) => {
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

    const auction1 = new Auction({
      author: arttatack.id,
      title: "Barra de resina epoxica",
      description: "Mesa de resina epoxica , con acabado de marmol",
      value: 450,
      currentValue: 450,
      bids: [bid2],
      image:
        "https://mesasepoxi.com/wp-content/uploads/2021/10/mesaepoxi.com-mesas-de-resina-epoxy-madera-nogal-olivo.jpg",
      finalDate: new Date("10/15/2022"),
    });

    const auction2 = new Auction({
      author: sofia.id,
      title: "Porta Sahumerio",
      description: "Mesa de resina epoxica , con acabado de marmol",
      value: 10,
      currentValue: 10,
      bids: [bid1],
      image: "111",
      finalDate: new Date("10/15/2022"),
    });

    const auction3 = new Auction({
      author: artesano.id,
      title: "breakfast table",
      description: "breakfast tray, water and temperature resistant",
      value: 15,
      currentValue: 15,
      image: "https://cdn.shopify.com/s/files/1/0832/0097/products/RECT_MARBLE_PRINT_TRAY-_BLACK_4.JPG?v=1661514651",
      finalDate: new Date("10/15/2022"),
    });

    const auction4 = new Auction({
      author: elsahlame.id,
      title: "artistic lighters",
      description: "Hand-painted lighters, with drawings on request",
      value: 5,
      currentValue: 5,
      image: "https://i.etsystatic.com/19554838/r/il/b1c92e/3645299122/il_570xN.3645299122_6kty.jpg",
      finalDate: new Date("10/15/2022"),
    });

    return Promise.all([
      auction1.save(),
      auction2.save(),
      auction3.save(),
      auction4.save(),
    ]);
    
  })
  .catch((error) => {
    console.log(`there was an error. Message: ${error.message}`);
  })
  .then(() => disconnect());
