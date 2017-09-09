const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.direccion, (errorMessage, geoResults) => {
    if (errorMessage){
        console.log(errorMessage);
    }else{
        console.log('Dirección: ', geoResults.direccion);
        weather.getWeather(geoResults, (errorMessage, weatherResults) =>{
            if (errorMessage){
                console.log(errorMessage);
            }else{
                console.log('Temperatura: ', weatherResults.temperatura);
                console.log('Térmica: ', weatherResults.termica);
                //console.log(JSON.stringify(results, undefined, 2));
            }
        });
    }
});