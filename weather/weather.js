
const request = require('request');

const getWeather = (data, callback) => {
const tempInCelsiusParam = '?units=si';
    request({
        url: `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${data.latitud},${data.longitud}${tempInCelsiusParam}`,
        json: true
    }, (error, response, body) =>{
        if(!error && response.statusCode === 200){
            callback(undefined, {
                                    temperatura: body.currently.temperature,
                                    termica: body.currently.apparentTemperature
                                });
        }else{
            callback("Se produjo algún error...");
        }
    });
}

module.exports.getWeather = getWeather;