const API_URL = process.env.REACT_APP_API_URL;

function createMessage(token, auctionId, text, callback){
    debugger
    if(typeof token !== "string") throw new TypeError("Token is not a String")
    if(typeof text !== "string") throw new Error("Text is not String")
    if(typeof callback !== "function") throw new TypeError("Callback is not a function")

    const xhr = new XMLHttpRequest();

    //  -->Response

    xhr.onload = function () {
        const status = xhr.status

        // Se filtran los estatos para saber que todo llega correctamente antes de dar 201
        if(status >= 500) callback (new Error(`Server error (${status})`));
        else if(status >= 400){
            const payload = xhr.responseText
            const data = JSON.parse(payload)

            callback(new Error(`Client Error (${status}):(${data.error})`))        
        }else if(status === 201) callback(null)
        
    }
        // A la URL que se conecta con el backEnd
        xhr.open("POST", `${API_URL}/auction/${auctionId}/messages`);

        // Headers con permisos
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.setRequestHeader("Content-type", "application/json");


        // Pasar el dato que se envia a JSON
        const json = JSON.stringify({ text })

        // Aqui se termina de enviar la peticion
        xhr.send(json)
}

export default createMessage;