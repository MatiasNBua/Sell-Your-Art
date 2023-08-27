import { useState } from 'react' //Se usa para decir que linkeamos react y lo vamos a usar, ( hay que llamarlo )
import './Header.css'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'
import MenuHeader from './MenuHeader'
import Test from './Test'
// import Filter from './Filter'

// import Setting from './Setting'


function Header({ onLogoutClick, onSettingClick, view: viewHome, /*onSearch*/ }) {

    const logger = new Loggito('header')

    const [view, setView] = useState(null)
    //this.state = { view: null }  <--- esta es la forma sin hook, para trabajar con react native//


    const handleMenuClick = () => {
        setView('menu')

        logger.debug('setView', 'menu')
    }

    const handleCloseClick = () => {
        setView(null)

        logger.debug('setView', null)
    }

    const handleSettingClick = () => {
        setView(null)

        logger.debug('setView', null)

        onSettingClick()
    }

    logger.info('render')



    return <header className="HeaderContainer">
        
        <div className="HeaderMenuContainer">
            {   view === null && <Test text="menu" onClick={handleMenuClick} />}
            {   view === 'menu' && <IconButton text="close" onClick={handleCloseClick} />}
        
            {   view === 'menu' && <MenuHeader onLogoutClick={onLogoutClick} onSettingClick={handleSettingClick} view={viewHome} />}
            </div>
    </header>

}

export default Header
