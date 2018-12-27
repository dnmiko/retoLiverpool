import User from '../models/users';
import jwt from 'jsonwebtoken';
import constants from '../../const';

const secret = constants.tokenSecret;
const tokenPrefix = constants.tokenPrefix;

export const verifyToken = (token) => {
    try {
        //Obtenemos el token de la autenticación en los headers.
        const [prefix, receivedToken] = token.split(' ');
        let user = null;

        if (!receivedToken) {
            throw new Error("No se recibió un token");
        }

        if (prefix != tokenPrefix) {
            throw new Error("Formato de header inválido");
        }

        //Utilizamos un método de JWT para verificar el token que recibimos.
        jwt.verify(receivedToken, secret, (err, payload) => {
            if (err) {
                throw new Error("Token inválido");
            } else {
                user = User.findById(payload.id).exec();
            }
        });

        if (!user) {
            throw new Error("El usuario no existe");
        }

        return user;

    } catch (err) {
        throw new Error("Error inesperado");
    }
}