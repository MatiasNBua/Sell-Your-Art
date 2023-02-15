import './Footer.css'
import { useState } from 'react'
import Loggito from '../utils/Loggito';

function Footer({ onProfileClick, onHomeClick, onUserAuctionsClick, onNewAuctionClick, onMessagesClick }) {

  const handleProfileClick = () => onProfileClick()
  const handleHomeClick = () => onHomeClick()
  const handleUserAuctionsClick = () => onUserAuctionsClick()
  const handleNewAuctionClick = () => onNewAuctionClick()
  const handleMessagesClick = () => onMessagesClick() 

  const uls = document.querySelectorAll("nav ul");
  const links = [...document.querySelectorAll("nav a")];
  const light = document.querySelector("nav .tubelight");

  let activeIndex = 0;
  let currentIndex = 0;
  let increment = 1;
  links.forEach((link, index) => {
    if (links[index].classList.contains("active")) {
      light.style.left = `${links[index].offsetLeft + light.offsetWidth / 4}px`;
    }

    link.addEventListener("click", e => {
      activeIndex = index;
      let t = setInterval(() => {
        if (activeIndex > currentIndex) increment = 1;
        else if (activeIndex < currentIndex) increment = -1;
        currentIndex += increment;

        links[currentIndex].classList.add("active");
        if (currentIndex != -1) links[currentIndex - increment].classList.remove("active");

        if (currentIndex == activeIndex) {
          e.target.classList.add("active");
          increment = 0;
          clearInterval(t);
        }
      }, 50);
      light.style.left = `${e.target.offsetLeft + light.offsetWidth / 4}px`;
    });
  });

  return (
    <nav className='footerContainer'>
      <ul >
        <li >
          <a href="#" className="active" onClick={handleHomeClick} >
            <span className="material-symbols-outlined">
              home
            </span>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="active" onClick={handleUserAuctionsClick} >
          <span class="material-symbols-outlined">
            collections_bookmark
          </span>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="active" onClick={handleNewAuctionClick} >
            <span className="material-symbols-outlined">
              add_circle
            </span>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="active" onClick={handleMessagesClick} >
            <span className="material-symbols-outlined">
              inbox
            </span>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="active" onClick={handleProfileClick}>
            <span className="material-symbols-outlined" >
              account_circle
            </span>
          </a>
        </li>
      </ul>

      <div className="tubelight">
        <div className="light-ray"></div>
      </div>
    </nav>
  )
}
export default Footer 