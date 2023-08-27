import './MenuHeader.css'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'

function Menu({ view, onLogoutClick, onSettingClick, context: { toggleTheme } }) {

    const logger = new Loggito('Menu')

    const handleLogoutClick = () => onLogoutClick()

    const handleSettingClick = () => onSettingClick()

    logger.info('return')

    return <div className="SettingsMenuContainer">
        <ul className="menuContainer">
            {view !== 'settings' && <li onClick={toggleTheme} className="Menu__item">
                <IconButton text="light" /><p> Themes</p>
            </li>}

            <li className="Menu__item" onClick={handleSettingClick}>
                <IconButton text="settings" /><p> Settings</p>
            </li>


            <li className="Menu__item"  onClick={handleLogoutClick}>
                <IconButton text="logout" /><p> Logout</p> 
            </li>
        </ul>
     
    </div>
}

export default withContext(Menu)