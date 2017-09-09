// const miPromise = new Promise( (resolve, reject) =>{

//     setTimeout(()=>{
//         resolve("Todo bien :)");
//     }, 2500);

//     reject("Todavia no terminó el setTimeout.");

// });

// miPromise.then((resultado)=>{
//     console.log("Resultado: ", resultado);
// }, (razon)=>{
//     console.log("Error: ", razon);
// });

const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {    
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }
            reject("No se pasaron dos numeros.")
        }, 1000);
    });
};

asyncAdd(10.1, -0.52).then((result)=>{
    console.log("Resultado: ", result);
}, (errorMessage) => {
    console.log("Se produjo un error: \n", errorMessage);
});