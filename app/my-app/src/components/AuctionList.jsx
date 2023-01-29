import Loggito from "../utils/Loggito";
import "./AuctionList.css";
import createBid from "../logics/createBid";
import withContext from "../utils/withContext";
import { useEffect, useState, } from "react";
import retrieveAuctions from '../logics/retrieveAuctions';

function AuctionList({ onNewBid, timestamp }) {
  const logger = new Loggito("List Auctions");

  const [auctions, setAuctions] = useState(null);

  useEffect(() => {
    try {
      // if (!query)
      retrieveAuctions(sessionStorage.token, (error, auctions) => {
        if (error) {
          // handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }
        logger.debug("set auctions", auctions);

        setAuctions(auctions);
      });
      // else
      // SearchAuctions(sessionStorage.token, /*query,*/ (error, auctions) => {
      //   if (error) {
      //     handleFeedback({ message: error.message, level: 'error' })

      //     logger.warn(error.message)

      //     return
      //   }

      // setAuctions(auctions)

      //   logger.debug('setauctions', auctions)
      // })
    } catch (error) {
      // handleFeedback({ message: error.message, level: "error" });
      logger.warn(error.message);
      // refreshList()

    }
  }, [timestamp]);

  const handleBidSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const {
      newBid: { value: newBid },
      dataset: { auctionId },
    } = form;

    try {
      createBid(
        sessionStorage.token,
        auctionId,
        newBid,
        (error) => {
          if (error) {
            // handleFeedBack({ message: error.message, level: 'warning'})

            logger.warn(error.message);

            return;
          }
          // handleFeedBack({ message: '!New bid Created¡', level:'success'}
          // refreshList();

          onNewBid()
        }
      );
    } catch (error) {
      // handleFeedBack({ message: error.message, level: 'warning' })
      logger.warn(error.message);

    }
  };

  return (
    <ul className="AuctionList">
      {auctions && auctions.map((auction) => (
        <li className="RenderAuctionsContainer" key={auction.id}>
          <div className="homePost">
            <img className="img" src={auction.image} alt="50X50 PIXELES" />
            <div className="tittleDescription">
              <div>
                <h3 className="titleAuction">{auction.title}</h3>
                <p>{auction.description}</p>
              </div>
              <div>
                <p>€ {auction.currentValue}</p>
              </div>
            </div>
            <form className="priceAndButton" onSubmit={handleBidSubmit} data-auction-id={auction.id}>
              <div className="priceContainer">
                <div className="textOffert">
                  <p> ¡Write here your Offert!</p>
                </div>
                <div className="inputAndButton">
                  <input className="inputBid" type="number" name="newbid" id="newBid" defaultValue={auction.currentValue + 1}/*onChange={handleChangeInput}*/ />
                  <button className="bidButton" id="bidButton" type="submit" /*disabled={!buttonActive}*/>
                    Bid
                  </button>
                </div>
              </div>
            </form>
            <div className="endDate">
              <p>End of auction:</p>
              <p className="DateP">
                {new Date(auction.finalDate).toISOString().substring(0, 10)}
              </p>

              {/* <p>remaining time: {auction.remainingTime}</p> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default withContext(AuctionList);
