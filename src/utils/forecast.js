const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&' + 'lon=' + longitude +'&units=metric&appid=63529bf0a170298867d2689b88b1f37c'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.weather[0].description + ' It is currently ' + response.body.main.temp + ' degress out.')
        }
    })
}

module.exports = forecast