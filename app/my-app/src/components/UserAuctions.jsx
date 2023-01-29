import { useEffect, useState } from "react";
import retrieveUserAuctions  from "../logics/retrieveUserAuctions"
import Loggito from "../utils/Loggito";
import "./UserAuctions.css"
import withContext from "../utils/withContext";

function RetrieveUserAuctions({ /*auctions, context: { handleFeedback }*/ }) {

  const [ auctions, setAuctions ] = useState(null)  
  const logger = new Loggito('My auctions list')

    useEffect(() => {
      retrieveUserAuctions(sessionStorage.token, (error, auction) => {
        if(error) {

          

          // handleFeedBack({ message: error.message, level: 'warning'})

          return
        }

          // handleFeedBack({ message: '!Retrieve Your Auctions¡', level:'success'})

        setAuctions(auction)
      })
    }, [])

    
    return (
    <ul className="AuctionList">
    {auctions && auctions.map((auction) => (
      <li className="renderMyAuctions" key={auction.id}>
        <div className="homePost">
          <h3 className="titleAuction">{auction.title}</h3>
          <img className="img" src={auction.image} alt="50X50 PIXELES" />
          <p>{auction.description}</p>

          <form>
            <p>€ {auction.currentValue}</p>
          </form>

          <div className="endDate">
            <p className="DateP">{new Date( auction.finalDate).toISOString().substring(0,10)}</p>
            end of auction:
          </div>
        </div>
      </li>
    ))}
  </ul>
    )
}

export default withContext(RetrieveUserAuctions)