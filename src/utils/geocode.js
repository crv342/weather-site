const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&appid=3c38d4031ae6c326afb21d083c62b3dd'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('error occured' + error, undefined)
        }
         else if (response.body.message) {
            callback(response.body.message,undefined)
         }
         else {
             callback(undefined, {
                 latitude: response.body.coord.lat,
                 longitude: response.body.coord.lon,
                 location: response.body.name,
             })
         }
    })
}

module.exports = geocode