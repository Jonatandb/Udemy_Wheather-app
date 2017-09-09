const yargs = require('yargs');
const axios = require('axios'); // Permite hacer requests pero trabaja con promises.
const argv = yargs
    .options({
        direccion: {
            demand: true,
            describe: 'Dirección de la cual obtener el clima.',
            alias: 'd',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
const encodedAddress = encodeURIComponent(argv.direccion);  // Convierte los espacios en '%20' y asi con los demás caracteres. 
const geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(geocodeURL).then((response)=> {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Dirección no encontrada.');
    }
    console.log(`Dirección: ${response.data.results[0].formatted_address}`);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const tempInCelsiusParam = '?units=si';
    const weaterURL = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}${tempInCelsiusParam}`;
    return axios.get(weaterURL);
}).then((response) => {
    console.log(`Temperatura: ${response.data.currently.temperature}ºC.`);
    console.log(`Sensación térmica: ${response.data.currently.apparentTemperature}ºC.`);
}).catch( (e) =>{
    if (e.code === 'ENOTFOUND') {
        console.log('Error: No se pudieron contactar los servidores de Google.');
    } else {
        console.log(`Error: ${e.message}`);
    }
});

