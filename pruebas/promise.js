var request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        const encodedAddress = encodeURIComponent(address);  // Convierte los espacios en '%20' y asi con los demás caracteres. 
        request({
                    uri: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
                    json: true
                }, (error, response, body) => {
                        if (error) {
                            reject("Se produjo un error contactando los servidores de Google.");
                        } else if (body.status === 'ZERO_RESULTS') {
                            reject("No se encontró la dirección.");
                        } else if(body.status === 'OK') {
                            resolve({
                                        direccion: body.results[0].formatted_address,
                                        latitud: body.results[0].geometry.location.lat,
                                        longitud: body.results[0].geometry.location.lng
                                    });
                        }
                });
    });
};

geocodeAddress('garin buenos aires').then( (location)=>{
    console.log(JSON.stringify(location, undefined, 2));
},(errorMessage)=>{
    console.log(errorMessage);
});