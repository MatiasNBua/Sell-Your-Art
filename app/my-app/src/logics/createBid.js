const API_URL = process.env.REACT_APP_API_URL;

function createBid(token, auctionId, price/*, date*/, callback) {
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");
  if (typeof auctionId !== "string") throw new TypeError("Auction is not a string")
  if (typeof callback !== "function")throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;  

    // const json = xhr.responseText
    const { error, token } = JSON.parse(json)

    if (status >= 500) callback(new Error(`server error (${status})`));
    else if (status >= 400) callback(new Error(`client error (${status})`));
    else if (status === 201) callback(null);
  };


  xhr.open("PATCH", `${API_URL}/auction/${auctionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  const bid = { price/*, date*/ };
  const json = JSON.stringify(bid)

  xhr.send(json);
}

export default createBid;
