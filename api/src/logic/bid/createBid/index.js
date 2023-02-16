const { User, Bid, Auction } = require("../../../models");
const {NotFoundError, SystemError, ConflictError} = require("errors");
const { validateString, validateText, validateDate } = require("validators");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Creates a Auction for a user.
 *
 * @param {string} userId The user id.
 * @param {string} text The Auction text.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */
function createBid(userId, auctionId, price/*, date*/) {
  verifyObjectIdString(userId, "user");
  verifyObjectIdString(auctionId, "auction");
  if (price !== Number);
  // validateDate(date, "date");
  // if ( bids !== Number)

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${user} not found`);

      return Auction.findById(auctionId);

      //const bid = new Bid({ price, dateBid })
      // return Auction.updateOne( { _id: auction }, { $push: { bids: bid } } } )
    })
    .then((auction) => {
      if (!auction)
        throw new NotFoundError(`auction with id ${auctionId} not found`);

      // see how it works

      if (auction.finalDate < Date.now())
        throw new Error("auction has finished before the bid");

        const isLowerThanAnyOtherBid = auction.bids.some(
        (bid) => price <= bid.price
      );

      if (isLowerThanAnyOtherBid)throw new ConflictError(`price of bid '${price}' is lower than the highest current bid`);

      const bid = new Bid({ user: userId, price/*, date*/ });

      auction.bids.push(bid);

      auction.currentValue = price

      return auction.save();
    })
    .then((auction) => {});
}

module.exports = createBid;
