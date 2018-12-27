//Creamos una instancia de los distintos paquetes que ocupamos en el proyecto
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserSchema from './src/models/users';
import graphQLHTTP from 'express-graphql';
import schema from './src/graphql';
import cors from 'cors';
import constants from './const';
import {
    createToken
} from './src/resolvers/create';
import {
    verifyToken
} from './src/resolvers/verify';

//Workaround por el cambio de Mongoose en el tipo de dato del ID.
const {
    ObjectId
} = mongoose.Types;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};

//iniciamos una instancia del servidor de express.
const app = express();
//Definimos el puerto en el cual podemos acceder al proyecto.
const PORT = process.env.PORT || 3000;

//Creamos la conexión con la base de datos.
mongoose.connect(constants.mongooseURL);
const db = mongoose.connection;

//Creamos callbacks para los casos de error y éxito de la conexión con la base de datos.
db.on('error', function () {
        console.log('Error en la conexión con la DB')
    })
    .once('open', function () {
        console.log('Conexión exitosa con la DB')
    });

app.use(bodyParser.json());
app.use(cors());

//Endpoint para crear un usuario nuevo. Se utiliza para crear usuarios en backend, no es parte del Reto Liverpool.
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

//Middleware para proteger graphql.
app.use('/graphql', (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
});

app.use('/graphql', graphQLHTTP((req, res) => ({
    schema,
    graphiql: true,
    pretty: true,
    context: {
        user: req.user
    }
})));

app.listen(PORT, function () {
    console.log("App working in port " + PORT);
});