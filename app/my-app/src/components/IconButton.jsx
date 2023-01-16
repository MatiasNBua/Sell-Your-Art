import Loggito from '../utils/Loggito'

function IconButton({ onClick, text }) {
    const logger = new Loggito ('return')
     
    logger.info('return')

    return <>
    <button className="transparent-button" onClick={onClick}><span className="material-symbols-outlined">{text}</span></button>
    </>
}

export default IconButton