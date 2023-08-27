import Loggito from '../utils/Loggito'
import authenticateUser from '../logics/authenticateUser'
import withContext from '../utils/withContext'
import iconEye from '../assets/icon-eye.svg'
import Button from '../components/Button'
import './LoginPage.css'

// import { GoogleLogin } from '@react-oauth/google';


// import { useGoogleLogin } from '@react-oauth/google';
// import { useState } from 'react';



function LoginPage({ onLinkClick, onLogIn, context: { handleFeedback } }) {
    const logger = new Loggito(LoginPage.name)

    // const [disabled , setDisabled] = useState(false)

    // const handeGoogleLogin = () => {
    //     setDisabled(true)
    //     try{
    //         window.google.accounts.id.initialize({
    //             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //             callback: handleResponse
    //         })
    //         window.google.accounts.id.promt((notification) => {
    //             if(notification.isNotDisplayed){
    //                 throw new Error("Try to clear the cookies or try again later")
    //             }
    //             if(notification.isSkippedMoment() || notification.isDismissedMoment()){
    //                 setDisabled(false)
    //             }
    //         })
    //     }catch{

    //     }
    // }
    
    logger.info('constructor')
    logger.info('return')

    // const login = useGoogleLogin({
    //     onSuccess: codeResponse => console.log(codeResponse)
    //   });




    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        const form = event.target

        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error'})

                    logger.warn(error.message)

                    return
                }

                logger.debug('user logged in')

                sessionStorage.token = token

                onLogIn()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error'})

            logger.warn(error.message)
        }
    }

    return <div className="loginPageContainer">

    <main className="login-page">
        <div className="titleOfLogin">
        <h1 className='tittle-of-login'>Welcome Back!</h1>
        </div>

        <form className="form-login" action="https://www.google.com/search" method="get" onSubmit={handleFormSubmit}>
            <div className="form__field">
                <label htmlFor="email">Email</label>
                <div className="email-input-container">
                <input className="input" type="email" name="email" placeholder="Email" id="email" />       
                </div>
            </div>

            <div className="form__field">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                <input className="input" type="password" name="password" placeholder="Password" id="password" />
                <img className='password-eye-icon' src={iconEye} alt="" />
                </div>
            </div>

            <div className="forgot-password">
                <a className='forgotYourPassword' href="">Forgot the password?</a>
            </div>

            <div className='buttons-login'>
                <Button text={'Log in'}/>

                <a className="anchor" href="register" onClick={handleLinkClick}>
                    <b>
                    Create new account!
                    </b>
                </a>
            </div>

        </form>

            {/* <GoogleLogin
        className="LoginGoogle"
          onSuccess={credentialResponse => {
            console.log(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
          /> */}



        {/* <button  onClick={handeGoogleLogin}>
          Log In Using Google
        </button> */}

        

    </main>
    </div>
}

export default withContext(LoginPage)