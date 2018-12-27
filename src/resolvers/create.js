import jwt from 'jsonwebtoken';
import User from '../models/users';
import constants from '../../const';

const expiresIn = constants.tokenExpiration;
const secret = constants.tokenSecret;

export const createToken = function (email, password) {
    //Verificamos que haya información en el request para no realizar operaciones innecesarias.
    if (!email || !password) {
        return false;
    }

    const user = User.findOne({
            "email": email
        })
        .then(function (user) {
            //Comparamos las contraseñas, sólo en caso de que sean iguales generamos el token.
            const compare = new Promise(function (resolve, reject) {
                user.comparePassword(password, function (err, isMatch) {
                    if (isMatch) {
                        let payload = {
                            email: user.email,
                            id: user.id
                        }

                        const token = jwt.sign(payload, secret, {
                            expiresIn
                        });

                        resolve(token);
                    } else {
                        reject(false);
                    }
                })
            });

            return compare;
        }).catch(function (err) {
            return err;
        });

    return user;
}