const { Message, Auction, User } = require("../../../models");
const { validateString } = require("validators");
const { verifyObjectIdString } = require("../../../utils");
const { SystemError, NotFoundError } = require("errors");


function createMessages(userId, auctionId, text) {
  debugger;
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(auctionId, "auction id");
  validateString(text, "text");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Auction.findById(auctionId).lean();
    })
    .then((auction) => {
      if (!auction)
        throw new NotFoundError(`Auction with id ${userId} does not exist`);

      return Message.create({
        user: userId,
        auction: auctionId,
        text,
      }).then((message) => {});
    });
}

// .then((auctions) => {
//     if(!auctions) throw new NotFoundError(`user with id ${userId} has not Auctions`)

//     auctions.forEach((auction) => {
//         auction.id = auction._id.toString();

//         delete auction._id

//         delete auction.__v
//     })
// })

module.exports = createMessages;
