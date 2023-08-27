import HomeIcon from '../assets/Home.svg'
import MyAuctionIcon from '../assets/MyAuctions.svg'
import NewAuctionIcon from '../assets/NewAuction.svg'
import FavoritesAuctionIcon from '../assets/favorites.svg'
import ProfileIcon from '../assets/Profile.svg'

import './Footer.css'

function Footer({ onProfileClick, onHomeClick, onUserAuctionsClick, onNewAuctionClick, onMessagesClick }) {

  const handleProfileClick = () => onProfileClick()
  const handleHomeClick = () => onHomeClick()
  const handleUserAuctionsClick = () => onUserAuctionsClick()
  const handleNewAuctionClick = () => onNewAuctionClick()
  const handleMessagesClick = () => onMessagesClick() 


  return (
    <nav className='footerContainer'>
      <ul >
        <li >
          <a href="#" onClick={handleHomeClick} >
            <img src={HomeIcon} alt="" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={handleUserAuctionsClick} >
          <img src={MyAuctionIcon} alt="" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={handleNewAuctionClick} >
          <img src={NewAuctionIcon} alt="" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={handleMessagesClick} >
          <img src={FavoritesAuctionIcon} alt="" />
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={handleProfileClick}>
          <img src={ProfileIcon} alt="" />
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default Footer 