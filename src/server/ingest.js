const fetch = require("node-fetch");

function fetchApi(symbols) {
  fetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${symbols}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "26b99a5e0emsha42f874174253e1p1de9b0jsn3c8169bfd0b7"
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data.quoteResponse.result);
    })
    .catch(err => {
      console.log(err);
    });
}

fetchApi("AAPL");
