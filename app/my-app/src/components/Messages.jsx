import createMessages from '../logics/createMessages'
import { useEffect, useState } from 'react'
import Loggito from '../utils/Loggito'
import retrieveMessage from '../logics/retrieveMessages'
import withContext from '../utils/withContext'
import { ConflictError, NotFoundError, ServerError } from 'errors'
import './Messages.css'
import retrieveMessages from '../logics/retrieveMessages'


function Chat({ auctionId, context: { handleFeedback } }) {
    const [messages, setMessages] = useState(null)
    const logger = new Loggito('Message Page')

    useEffect(() => {
        logger.info('componentDidMount')

        try {
            retrieveMessages(sessionStorage.token, auctionId, (error, messages) => {
                if (error) {
                    logger.warn(error.messages)

                    return;
                }

                setMessages(messages)

                logger.debug("setMessages", messages)
            });
        } catch (error) {
            logger.warn(error.message)
        }
    }, []);

    const onFormSubmit = (event) => {
        event.preventDefault()

        const form = event.target;
        const text = form.text;
        const message = text.value;

        try {
            createMessages(sessionStorage.token, auctionId, message, (error) => {
                if (error) {
                    if (error instanceof ServerError) {
                        logger.error(error.message);
                    } else if (
                        error instanceof NotFoundError || error instanceof ConflictError
                    ) {
                        logger.warn(error.message)
                    }
                    return;
                }
                try {
                    retrieveMessages(sessionStorage.token, auctionId, (error, messages) => {
                        if (error) {
                            logger.warn(error.message)

                            return
                        }

                        setMessages(messages)

                        logger.debug("setMessages", messages)
                    }
                    )
                } catch (error) {
                    logger.warn(error.message)
                }
            });
        } catch (error) {
            logger.warn(error.message)
        };
    }


    const onRefreshChat = () => {
        retrieveMessages(sessionStorage.token, auctionId, (error, messages) => {
            if (error) {
                logger.warn(error.message);

                return;
            }

            setMessages(messages);

            logger.debug("setMessages", messages);
        });
    };



    return (<div className="SendEmailContainer">
        <div className="formContainer">
            <div className="toContainer">
                <h2>To:</h2>
                <input className="input-of-messages" type="text" />
            </div>
            <div className="messageContainer">
                <p>¡Message Here!</p>
                <textarea className="textArea-of-messages" type="text" />
            </div>

            <div className="button-container">
                <button className='send-message'> Send Message</button>
            </div>
        </div>
    </div>
    );
}

export default withContext(Chat)