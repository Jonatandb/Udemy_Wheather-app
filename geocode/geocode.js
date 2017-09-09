const request = require('request');

const geocodeAddress = (direccion, callback) => {
    
    const encodedAddress = encodeURIComponent(direccion);  // Convierte los espacios en '%20' y asi con los demás caracteres. 

    request({
        uri: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Se produjo un error contactando los servidores de Google.");
        } else if (body.status === 'ZERO_RESULTS') {
            callback("No se encontró la dirección.");
        } else if(body.status === 'OK') {
            callback(undefined, {
                direccion: body.results[0].formatted_address,
                latitud: body.results[0].geometry.location.lat,
                longitud: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;