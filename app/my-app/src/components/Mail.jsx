import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import authenticateUser from '../logics/authenticateUser'


function Mail({ onLinkClick, context: { handleFeedback }}) {
    const logger = new Loggito('Settings')


    return <div className="mailContainer">
    <main>
        <h3 className="Imbox"> Messages </h3>
        
        {/* <div className="form__field"> */}
        {/* <label htmlFor="category">messages</label>
        <input className="input" type="text" name="Imbox" placeholder="Imbox" id="Imbox" /> */}
        {/* </div> */}

    <div className="form__field">
        <label htmlFor="WriteMail">Write Mail</label>
        <label htmlFor="subCategory">Destinatary</label>    
        <input className="input" type="text" name="subCategory" placeholder="subCategory" id="subCategory" />
        <button>Send</button>
    </div>

    </main>
    </div>
}

export default withContext(Mail)