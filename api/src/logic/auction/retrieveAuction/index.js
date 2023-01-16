const { User, Auction } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

function retrieveAuction(userId) {
  verifyObjectIdString(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Auction.find(
        { finalDate: { $gte: new Date(Date.now()) } },
        "author title description value image finalDate currentValue"
      )
        .lean()
        .catch((error) => {
          throw new SystemError(error.message);
        });
    })
    .then((auctions) => {
      auctions.forEach((auction) => {
        // sanitize

        auction.id = auction._id.toString();

        // const maxBid = auction.bids.reduce((previousBid, currentBid) => {
        //   if (currentBid.price > previousBid.price) return currentBid;
        // });

        // auction.maxBid = maxBid;

        delete auction._id;

        delete auction.__v;

        // delete auction.bidss
      });

      //   auctions.forEach(() => {
      //     delete auction.bids;
      //   });

      return auctions;
    });
}

module.exports = retrieveAuction;
