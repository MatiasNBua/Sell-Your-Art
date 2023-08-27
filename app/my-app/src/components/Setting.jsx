import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import updateUserPassword from '../logics/updateUserPassword'
import "./Setting.css"

function Setting({ onCloseClick, context: { handleFeedback } }) {
  const logger = new Loggito('Setting')

  logger.info('render')

  const handleFormSubmit = event => {
    event.preventDefault()

    const { target: form } = event
    const { oldPassword: { value: oldPassword }, newPassword: { value: newPassword }, newPasswordRepeat: { value: newPasswordRepeat } } = form

    try {
      updateUserPassword(
        sessionStorage.token,
        oldPassword,
        newPassword,
        newPasswordRepeat,
        error => {
          if (error) {
            handleFeedback({ message: error.message, level: 'warning' })

            logger.warn(error.message)

            return;
          }
          // alert("Password updated");

          handleFeedback({ message: 'Password Updated', level: 'success' })
          form.reset() //para limpiar el formulario luego del cambio de contraseña.//
          onCloseClick()
        });
    } catch (error) {
      handleFeedback({ message: error.message, level: 'warning' })

      logger.warn(error.message)
    }
  }

  return <div className="settingsPanelContainer">


    <form className="update-password-form-form" onSubmit={handleFormSubmit}>
      <div className="form__field_setting">
        <h2 className="tittleSetting"> Change Password </h2>
      </div>

      <div className="form__field_setting">
        <label htmlFor="oldPassword">Password</label>
        <input className="input" type="password" name="oldPassword" placeholder="Your Password" id="oldPassword" />
      </div>

      <div className="form__field_setting">
        <label htmlFor="newPassword">New Password</label>
        <input className="input" type="Password" name="newPassword" placeholder="New Password" id="newPassword" />
      </div>

      <div className="form__field_setting">
        <label htmlFor="newPasswordRepeat">Repeat Password</label>
        <input className="input" type="password" name="newPasswordRepeat" placeholder="Repeat Password" id="newPasswordRepeat" />
      </div>

      <div className="button-of-setting">
      <button className="button" type="submit">Change Password</button>
      </div>
    </form>
  </div>
}

export default withContext(Setting)