const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=3c38d4031ae6c326afb21d083c62b3dd'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('error' + body.message, undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temp + ' degress out. the weather description:' + body.current.weather[0].description)
        }
    })
}

module.exports = forecast