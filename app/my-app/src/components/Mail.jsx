import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import authenticateUser from '../logics/authenticateUser'
import './Mail.css'


function Mail({ onLinkClick, context: { handleFeedback }}) {
    const logger = new Loggito('Settings')


    return <div className="mailContainer">
    <main className='test'>

   
    <div className="form__field">
        <h3 className="Imbox"> Messages </h3>

        <label htmlFor="WriteMail">Write Mail</label>
        <label htmlFor="subCategory">Destinatary</label>    
        <input className="input" type="text" name="subCategory" placeholder="Write here" id="subCategory" />
        <button>Send</button>
    </div>
    

    </main>
    </div>
}

export default withContext(Mail)