const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "El correo no tiene un formato valido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    rol: {
        type: String,
        enum: {
            values: ["miembro", "bibliotecario", "admin"],
            message: "El rol '{VALUE}' no es valido"
        },
        default: "miembro"
    },
    perfil: {
        telefono: {
            type: String,
            trim: true
        },
        direccion: {
            type: String,
            trim: true
        }
    },
    historial_prestamo: {
        type: [
            {
                tipo: { type: String },
                fecha: { type: Date, default: Date.now },
                nota: { type: String }
            }
        ],
        default: []
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Usuario", usuarioSchema);