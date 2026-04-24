const data = process.argv.slice(2);

function greet(names){
    names.forEach(element => {
       process.send(`Hello, ${element}`)  
    });
}

greet(data)

process.on("message", userData => {
    console.dir(userData, { color: true})
})