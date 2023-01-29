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
            {view !== 'settings' && <li className="Menu__item">
                <IconButton text="light" onClick={toggleTheme} />Themes
            </li>}

            <li className="Menu__item">
                <IconButton text="settings" onClick={handleSettingClick} /> Settings
            </li>


            <li className="Menu__item">
                <IconButton text="logout" onClick={handleLogoutClick} /> Logout
            </li>
        </ul>
    </div>
}

export default withContext(Menu)