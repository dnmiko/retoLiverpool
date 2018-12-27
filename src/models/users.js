import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

//Modelamos la colección de usuarios.
const UserSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "last_name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "is_admin": {
        type: Boolean,
        default: false
    },
    "created_at": {
        type: Date,
        default: new Date()
    },
    //Bandera para borrar lógico, inactiva un usuario pero no lo borra de la base de datos.
    "is_active": {
        type: Boolean,
        default: true
    }
}, {
    collection: "Users",
    timestamps: true
});

//Función previa al almacenamiento de un usuario, encripta la contraseña antes de guardarla en la base de datos.
UserSchema.pre('save', function (next) {
    let user = this;

    //Verificamos que se haya modificado algo para no ejecutar acciones innecesarias.
    if (!user.isModified('password'))
        return next;

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return err;

        //Hasheamos la contraseña.
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);

            user.password = hash;
            next();
        });
    });
});

//Método que compara la contraseña que se ingresa en un intento de login.
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    //No desencriptamos la contraseña almacenada por seguridad, encriptamos la contraseña que se intenta ingresar.
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        cb(null, isMatch);
    });
};

export default mongoose.model('Users', UserSchema);