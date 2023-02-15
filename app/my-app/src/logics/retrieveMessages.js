const API_URL = process.env.REACT_APP_API_URL;

function retrieveMessages(token,auctionId, callback){
    if(typeof token !== "string") throw new TypeError("Token is not a String")
    if(token.trim().length === 0 ) throw new Error("Token is Empty or Blanc")
    // if(typeof auctionId !== "string") throw new TypeError("Auction id is not a String")
    if(typeof callback !== "function") throw new TypeError("Callback is not a Function")

    const xhr = new XMLHttpRequest();

    // Response

    xhr.onload = function () {
        const status = xhr.status;

        if (status >= 500) callback(new Error(`Server Error (${status})`));
        else if(status >= 400){
            const payload = xhr.responseText;
            const data = JSON.parse(payload)

            callback(new Error(`Client Error (${status}): ${data.error}`))
        } else if (status === 200) {
            const json = xhr.responseText
            const messages = JSON.parse(json)

            callback(null, messages)
        }
    }

    xhr.open("GET", `${API_URL}/auction/${auctionId}/messages`)
    xhr.setRequestHeader("Authorization", `Bearer${token}`)

    xhr.send()
}

export default retrieveMessages