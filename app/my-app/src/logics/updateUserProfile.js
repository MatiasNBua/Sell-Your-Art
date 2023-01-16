const API_URL = process.env.REACT_APP_API_URL

function updateUserProfile(token, gender, city, aboutYou, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (token.trim().length === 0) throw new Error('token is empty or blank')
    
    if( typeof gender !== 'string') throw new TypeError('gender is not a string')
    if( typeof city !== 'string') throw new TypeError('City is not a string')
    if( typeof aboutYou !== 'string') throw new TypeError('Your informations is not a string')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
    
    const xhr = new XMLHttpRequest()
  
    // response
  
  
    xhr.onload = function () {
        const status = xhr.status
  
        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }
  
    
  
    xhr.open('PATCH', `${API_URL}/users`)
  
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')
  
    const json = JSON.stringify({ gender, city, aboutYou })
  
  
    xhr.send(json)
  }
  
  export default updateUserProfile