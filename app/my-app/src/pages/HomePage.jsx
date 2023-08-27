import { useState, useEffect } from 'react'
import withContext from '../utils/withContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import retrieveUser from '../logics/retrieveUser'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Loggito from '../utils/Loggito'
import Profile from '../components/Profile'
import UserAuctions from '../components/UserAuctions'
import NewAuction from '../components/NewAuction'
import Messages from '../components/Messages'
import Setting from '../components/Setting'
import AuctionList from '../components/AuctionList'
import Filter from '../components/Filter'

function HomePage({ onLogoutClick, context: { handleFeedback }, }) {

  const logger = new Loggito('HomePage')

  const navigate = useNavigate()
  const [timestamp, setTimestamp] = useState()


  useEffect(() => {
    logger.info('"componentDidMount"')

    try {
      retrieveUser(sessionStorage.token, (error, user) => {
        if (error) {
          handleFeedback({ message: error.message, level: 'error' })

          logger.warn(error.message)

          onLogoutClick()

          return
        }

        logger.debug('setName', user.name)
      })
    } catch (error) {
      handleFeedback({ message: error.message, level: 'error' })

      logger.warn(error.message)
    }
  }, [])

  
  const handleProfileClick = () => {
    navigate('profile')

    logger.debug('navigate to list')

    logger.info('return')
  }
  const handleHomeClick = () => {
    navigate('/')

    logger.debug('navigate to Home')

    logger.info('return')
  }

  const handleUserAuctionsClick = () => {
    navigate('userAuctions')

    logger.debug('navigate to My Auctions')

    logger.info('return')
  }

  const handleNewAuctionClick = () => {
    navigate('newauction')

    logger.debug('navigate to New Auction')

    logger.info('return')
  }

  const handleMessagesClick = () => {
    navigate('Messages')

    logger.debug('navigate to Messages')

    logger.info('return')
  }
  const handleSettingClick = () => {
    navigate('setting')

    logger.info('return')
  }
  
  function refreshList () {
    setTimestamp(Date.now())
  }
  return <div className="Home">

    <header className="headerBanner">
      <Header onLogoutClick={onLogoutClick} onSettingClick={handleSettingClick}/>
        {/* <Filter  /> */}
      
    </header>

    <body className='body-container'>
    <Routes>
      <Route path="/" element={<AuctionList timestamp={timestamp} onNewBid={refreshList} />} />
      <Route path="profile" element={<Profile />} />
      <Route path="UserAuctions" element={<UserAuctions />} />
      <Route path="Newauction" element={<NewAuction onNewAuction={refreshList}/>} />
      <Route path="Messages" element={<Messages />} />
      <Route path="Setting" element={<Setting />} />
    </Routes>
    </body>

    <div className="footer">
      <Footer onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} onUserAuctionsClick={handleUserAuctionsClick} onNewAuctionClick={handleNewAuctionClick} onMessagesClick={handleMessagesClick} />
    </div>

  </div>
}

export default withContext(HomePage)