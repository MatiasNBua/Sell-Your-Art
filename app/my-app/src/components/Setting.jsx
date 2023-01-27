import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import updateUserPassword from '../logics/updateUserPassword'
import "./Setting.css"

function Setting({ onCloseClick, context: { handleFeedback }}) {
    const logger = new Loggito('Setting')

    logger.info('render')

    const handleFormSubmit = event => {
        event.preventDefault()

        const { target: form } = event
        const {oldPassword:{value:oldPassword}, newPassword:{value:newPassword}, newPasswordRepeat:{value:newPasswordRepeat}} = form

    try {
        updateUserPassword(
          sessionStorage.token,
          oldPassword,
          newPassword,
          newPasswordRepeat,
          error => {
            if (error) {
              handleFeedback({ message: error.message, level: 'warning'})

              logger.warn(error.message)
    
              return;
            }
            // alert("Password updated");
            
            handleFeedback({ message: 'Password Updated', level: 'success'})
            form.reset() //para limpiar el formulario luego del cambio de contraseña.//
            onCloseClick ()
          });
      } catch(error) {
        handleFeedback({message: error.message, level:'warning'})

        logger.warn(error.message)
      }
    }
    
    return <div className="settingsPanelContainer">
      {/* <IconButton text="close" onClick={onCloseClick} /> */}
    <form className="update-password-form form" onSubmit={handleFormSubmit}>
        <div className="form__field">
            <label htmlFor="oldPassword">Change your password</label>
            <input className="input" type="password" name="oldPassword" placeholder="old password" id="oldPassword" />
        </div>

        <div className="form__field">
            <label htmlFor="newPassword">New password</label>
            <input className="input" type="Password" name="newPassword" placeholder="" id="newPassword" />
        </div>

        <div className="form__field">
            <label htmlFor="newPasswordRepeat">Repeat password</label>
            <input className="input" type="password" name="newPasswordRepeat" placeholder="" id="newPasswordRepeat" />
        </div>

        <button className="button" type="submit">Update</button>
    </form>
</div>
}

export default withContext(Setting)