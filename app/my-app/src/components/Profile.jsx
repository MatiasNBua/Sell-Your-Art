import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import './Profile.css'
import updateUserProfile from '../logics/updateUserProfile'



function Profile({ onCloseClick, context: { handleFeedback } }) {

  const logger = new Loggito('Profile')


  const handleProfileFormSubmit = event => {
    event.preventDefault()

    const { target: form } = event
    const { gender: { value: gender }, city: { value: city }, aboutYou: { value: aboutYou } } = form



    try {
      updateUserProfile(
        sessionStorage.token,
        gender,
        city,
        aboutYou,
        error => {
          if (error) {
            handleFeedback({ message: error.message, level: 'warning' })

            logger.warn(error.message)

            return;
          }
          // alert("Password updated");

          handleFeedback({ message: '¡Profile Updated!', level: 'success' })
          // onCloseClick ()
          // form.reset() //para limpiar el formulario luego del cambio de contraseña.//
        });
    } catch (error) {
      handleFeedback({ message: error.message, level: 'warning' })

      logger.warn(error.message)
    }
  }


  return <div className="updateProfileCcontainer">

    <form className="update-profile-form-form" onSubmit={handleProfileFormSubmit}>
      <div className="form__field_profile">
        <h2 className="tittleProfile"> Your profile </h2>
      </div>


      <div className="form__field_profile">
        <label htmlFor="gender">Male / Female</label>
        <input className="input" type="text" name="gender" placeholder="gender" id="gender" />
      </div>

      <div className="form__field_profile">
        <label htmlFor="city">City</label>
        <input className="input" type="text" name="city" placeholder="city" id="city" />
      </div>

      <div className="form__field_profile">
        <label htmlFor="aboutYou">About you</label>
        <input className="input" type="text" name="aboutYou" placeholder="About you..." id="aboutYou" />
      </div>

    <div className="button-of-profile">
      <button className="button" type="submit">Update profile</button>
    </div>
    </form>
  </div>

}

export default withContext(Profile)