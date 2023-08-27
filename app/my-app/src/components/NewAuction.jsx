import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import createAuction from '../logics/createAuction'
import './NewAuction.css'

function NewAuction({ onNewAuction, context: { handleFeedback } }) {
    const logger = new Loggito('newAuction')

    const handleFormSubmit = event => {
        event.preventDefault()

        debugger
        const {
            target: form,
            target: {
                title: { value: title },
                category: { value: category },
                description: { value: description },
                value: { value: value },
                image: { value: image },
                finalDate: { value: finalDate },

            }
        } = event
        // createAuction( sessionStorage.token, productName, title, value, image,description)

        try {
            createAuction(
                sessionStorage.token,
                title,
                category,
                description,
                value,
                image,
                finalDate,
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
            handleFeedback({ message: error.message, level: 'warning' })

            logger.warn(error.message)
        }
    }

    return <main className="new-auction-contianer">
        <form className="create-auction-form" action="https://www.google.com/search" method="get" onSubmit={handleFormSubmit} >
            <div className="form__field">
                <h2 className="tittle-new-auction"> Your Article </h2>
            </div>

            <div className="form__field">
                <label htmlFor="title"> Title </label>
                <input className="input" type="text" name="title" placeholder="" id="title" />
            </div>

            <div className="form__field">
                <label htmlFor="category">Category</label>
                <select className="input-category" name="category" id="category">
                    <option value="paints">Paints</option>
                    <option value="drawing">Drawing</option>
                    <option value="sculptures">Sculptures</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="ceramics">Ceramics</option>
                    <option value="glass">Glass</option>
                </select>
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
                <input className="input" type="text" name="image" placeholder="Select image" accept='image/*' id="image" />
            </div>

            <div className="form__field">
                <label htmlFor="finalDate">finalDate</label>
                <input className="input" type="date" name="finalDate" placeholder="..." id="finalDate" />
            </div>

            <div className="button-of-newAuction">
                <button className="button" type="submit">Create Auction</button>
            </div>

        </form>
    </main >

}

export default withContext(NewAuction)