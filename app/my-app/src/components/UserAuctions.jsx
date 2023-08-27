import { useEffect, useState } from "react";
import retrieveUserAuctions from "../logics/retrieveUserAuctions"
import Loggito from "../utils/Loggito";
import "./UserAuctions.css"
import withContext from "../utils/withContext";

function RetrieveUserAuctions({ /*auctions, context: { handleFeedback }*/ }) {

  const [auctions, setAuctions] = useState(null)
  const logger = new Loggito('My auctions list')

  useEffect(() => {
    retrieveUserAuctions(sessionStorage.token, (error, auction) => {
      if (error) {



        // handleFeedBack({ message: error.message, level: 'warning'})

        return
      }

      // handleFeedBack({ message: '!Retrieve Your Auctions¡', level:'success'})

      setAuctions(auction)
    })
  }, [])


  return (
    <div className="personal-auction-list-container">
      <div className="title-personal-auctionList">
        <h2 className="personal-of-auctionList">These are your auctions</h2>
      </div>
      <ul className="personal-auction-list-ul">
        {auctions && auctions.map((auction) => (
          <li className="personal-AuctionList" key={auction.id}>
            <div className="homePost">
              <div className="OnlyImage">
                <img className="img" src={auction.image} alt="50X50 PIXELES" />
              </div>

              <div className="tittleAndDescriptionContainer">
                <div className="tittleAndDescription">
                  <h3 className="titleAuction">{auction.title}</h3>
                  <p >{auction.description}</p>
                </div>
              </div>

              <form >
                <p className="currentValue"> last Price: €{auction.currentValue}</p>
              </form>

              <div className="endDate">
                <p className="DateP">{new Date(auction.finalDate).toISOString().substring(0, 10)}</p>
                end of auction:
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withContext(RetrieveUserAuctions)