import Loggito from "../utils/Loggito";
import createBid from "../logics/createBid";
import withContext from "../utils/withContext";
import retrieveAuctions from '../logics/retrieveAuctions';
import SearchAunctions from "./SearchAuctions";

import { useEffect, useState, } from "react";
import "./AuctionList.css";

function AuctionList({ refreshList, onNewBid, timestamp, context:{ handleFeedback } }) {
  const logger = new Loggito("List Auctions");
  const [auctions, setAuctions] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['glass', 'ceramics', 'jewelry', 'sculptures', 'drawing', 'paints']; // Define tus categorías aquí


  useEffect(() => {
    try {
      retrieveAuctions(sessionStorage.token, (error, auctions) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }
        logger.debug("set auctions", auctions);

        setAuctions(auctions);
      })
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });
      logger.warn(error.message);
      refreshList()
      

    }
  }, [timestamp]);

  const filteredAuctions = selectedCategory
  ? auctions.filter((auction) => auction.category === selectedCategory)
  : auctions;

  const clearCategorySelection = () => {
    setSelectedCategory('');
  };

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
            handleFeedback({ message: error.message, level: 'warning'})

            logger.warn(error.message);

            return;
          }
          handleFeedback({ message: '!New bid Created¡', level:'success'})
          
          onNewBid()
        }
        );
      } catch (error) {
        handleFeedback({ message: error.message, level: 'warning' })
        logger.warn(error.message);
        refreshList()

    }
  };

  return (
    <div className="auction-list-container">
      <div className="title-auctionList">
      <h2 className="title-of-auctionList">Find the art that you like</h2>
      <SearchAunctions
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClearCategory={clearCategorySelection}
        />
      </div>
    <ul className="AuctionList">
      {Array.isArray(filteredAuctions) &&
          filteredAuctions.map((auction) => (
        
        <li className="RenderAuctionsContainer" key={auction.id}>
          <div className="homePost">
            <div className="OnlyImage">
            <img className="img" src={auction.image} alt="50X50 PIXELES" />
            </div>
            <div className="tittleAndDescriptionContainer">
              <div className="tittleAndDescription">
                <h3 className="titleAuction">{auction.title}</h3>
                <div className="">
                <p className="auctionDescription">{auction.description}</p>
                </div>
              </div>
            </div>
            <div className="priceAndButton">
            <form className="priceAndButton" onSubmit={handleBidSubmit} data-auction-id={auction.id}>
              <div className="priceContainer">
              <p className="">The bidding starts at:</p>
                <div className="textOffert">
                  <input className="inputBid" type="number" name="newbid" id="newBid" defaultValue={auction.currentValue + 1} />
                  <p className="currentValue">{auction.currentValue} €</p>
                </div>
                <div className="inputAndButton">
                  <button className="bidButton" id="bidButton" type="submit" /*disabled={!buttonActive}*/>
                    Bid
                  </button>
                </div>
              </div>
            </form>
            </div>
            <div className="endDate">
              <h6> Category: {auction.category} </h6>
              <div className="endDateContainer">
              <p>End of auction:</p>
              <p className="DateP">
                {new Date(auction.finalDate).toISOString().substring(0, 10)}
              </p>
              </div>

              {/* <p>remaining time: {auction.remainingTime}</p> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default withContext(AuctionList);
