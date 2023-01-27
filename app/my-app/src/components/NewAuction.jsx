    import Loggito from '../utils/Loggito'
    import withContext from '../utils/withContext'
    import createAuction from '../logics/createAuction'
    import './NewAuction.css'

    function NewAuction({ onNewAuction, context: { handleFeedback } }) {
        const logger = new Loggito('newAuction')

        const handleFormSubmit = event => {
            event.preventDefault()

            const {
                target: form,
                target: {
                    title: { value: title },
                    description: { value: description },
                    value: { value: value },
                    image: { value: image },
                    finalDate: { value: finalDate },
                    // initialDate: { value: initialDate },

                }
            } = event
            // createAuction( sessionStorage.token, productName, title, value, image,description)

            try {
                createAuction(
                    sessionStorage.token,
                    title,
                    description,
                    value,
                    image,
                    finalDate,
                    // initialDate,
                    (error) => {

                        if (error) {

                            handleFeedback({ message: error.message, level: 'warning' })

                            logger.warn(error.message)
                                        
                            return;
                        }

                        handleFeedback({ message: '¡New Auction!', level: 'success' })
                        // onCloseClick()
                        form.reset() //para limpiar el formulario

                        onNewAuction()
                    });

            } catch (error) {
                handleFeedback({ message:error.message, level: 'warning' })

                logger.warn(error.message)
            }
        }

        return <main className="profileContainer">
            <form className="form" action="https://www.google.com/search" method="get" onSubmit={handleFormSubmit} >


                <div className="form__field">
                    <h2 className="tittleProfile"> Your Article </h2>
                    <label htmlFor="title"> Title </label>
                    <input className="input" type="text" name="title" placeholder="" id="title" />
                </div>

                <div className="form__field">
                    <label htmlFor="description">description</label>
                    <input className="input" type="text" name="description" placeholder="" id="description" />
                </div>

                <div className="form__field">
                    <label htmlFor="value">Price</label>
                    <input className="input" type="number" name="value" placeholder="€" id="value" />
                </div>

                <div className="form__field">
                    <label htmlFor="image">Select yours photos</label>
                    <input className="input" type="text" name="image" placeholder="" id="image" />
                </div>

                <div className="form__field">
                    <label htmlFor="finalDate">finalDate</label>
                    <input className="input" type="date" name="finalDate" placeholder="..." id="finalDate" />
                </div>

                <button className="button" type="submit">Create Auction</button>

            </form>
        </main >

    }

    export default withContext(NewAuction)