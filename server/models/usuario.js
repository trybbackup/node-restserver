const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol valido'
};
let Schema = mongoose.Schema;
let usuarioShema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es requerido!']
	},
	email: {
		type: String,
		unique: true,
		required:  [true, 'El correo es requerido']
	},
	password: {
		type: String,
		required: [true, 'La clave es requerida']
	},
	img: {
		type: String,
		required: false
	}, 
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	}, 
	estado: {
		type: String,
		default: true
	}, 
	google: {
		type: Boolean,
		default: false
	}
});
					//Nombre del Modelo Usuario y la configuracion es usuarioShema 


usuarioShema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' })
module.exports = mongoose.model('Usuario', usuarioShema )