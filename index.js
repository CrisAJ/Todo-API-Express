const express = require("express");

const app = express();

const routes = require("./routes");


// Permite recibir JSON

app.use(express.json());


// Usar rutas

app.use(routes);


// Puerto

const PORT = 3000;


app.listen(PORT, ()=>{

    console.log(`Servidor funcionando en puerto ${PORT}`);

});