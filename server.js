import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserSchema from './src/models/users';
import {
    createToken
} from './src/resolvers/create';

//iniciamos una instancia del servidor de express.
const app = express();
//Definimos el puerto en el cual podemos acceder al proyecto.
const PORT = process.env.PORT || 3000;

//Creamos la conexión con la base de datos.
mongoose.connect('mongodb://admin:retoLiverpool1@ds141633.mlab.com:41633/retoliverpool');
const db = mongoose.connection;

//Creamos callbacks para los casos de error y éxito de la conexión con la base de datos.
db.on('error', function () {
        console.log('Error en la conexión con la DB')
    })
    .once('open', function () {
        console.log('Conexión exitosa con la DB')
    });

//El método use sirve para decirle a express que utilice una librería específica.
app.use(bodyParser.json());

//Endpoint para crear un usuario nuevo.
app.post('/signup', function (req, res) {
    let user = req.body;

    UserSchema.create(user).then((user) => {
        return res.status(201).json({
            "message": "Usuario creado",
            "id": user._id
        });
    }).catch((err) => {
        console.log(err)
        return res.json(err);
    });
});

//Endpoint para logear a un usuario.
app.post('/login', function (req, res) {
    const token = createToken(req.body.email, req.body.password).then((token) => {
        res.status(201).json({
            token
        });

    }).catch(() => {
        res.status(403).json({
            message: "Login Failed, invalid credentials"
        });
    });
});

app.listen(PORT, function () {
    console.log("App working in port " + PORT);
});

app.get('/', function (req, res) {
    res.send("Estoy funcionando");
});