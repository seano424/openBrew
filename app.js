const express = require('express')
const https = require('https');
const bodyParser = require('body-parser');
const port = 3000


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

  const cityName = req.body.cityName

  const url = "https://api.openbrewerydb.org/breweries?by_city=" + cityName + "&per_page=1"

  https.get(url, (response) => {

    response.on('data', (d) => {
      const information = JSON.parse(d);
      const name = information[0].name;
      const street = information[0].street;
      const city = information[0].city;
      const website_url = information[0].website_url;
      console.log(information);
      console.log(name);
      res.write(`<h1>Brewery: ${name} is located on ${street}, ${city}. For more information you can go to ${website_url}</h1>`)
      res.send()
    })
  })
})






app.listen(port, () => console.log(`Listening to port ${port}`))
