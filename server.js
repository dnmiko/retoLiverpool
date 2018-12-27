import express from 'express';

//iniciamos una instancia del servidor de express.
const app = express();
//Definimos el puerto en el cual podemos acceder al proyecto.
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App working in port " + PORT);
});

app.get('/', function (req, res) {
    res.send("Estoy funcionando");
});