const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');
// const usuario = require('../models/usuario');
app.get('/usuario/all', function (req, res) {
	let desde = req.query.desde || 0;
	desde = parseInt(desde)
	// desde = Number(desde)
	let limite = req.query.limite || 5;
	limite = parseInt(limite)
	Usuario.find({}, 'nombre email role estado google img') //  primer parametro {busca algun registro en la bd} // segundo parametro lo que devuelve al response
	       .skip(desde)
		   .limit(limite)
		   .exec((err, usuarios) =>{
			if ( err ){
				return  res.status(400).json({
					 ok: false,
					 err: err
				 });
			 }
			 Usuario.countDocuments({}, (err, conteo) => {
				res.json({
					ok: true,
					usuarios,
					cuantos: conteo
				 });
			 } )

	
		   })
})

app.get('/usuario/activos', function (req, res) {
	Usuario.find({estado:true}, 'nombre email role estado google img') //  primer parametro {busca algun registro en la bd} // segundo parametro lo que devuelve al response

		   .exec((err, usuarios) =>{
			if ( err ){
				return  res.status(400).json({
					 ok: false,
					 err: err
				 });
			 }
			 Usuario.countDocuments({estado:true }, (err, conteo) => {
				res.json({
					ok: true,
					usuarios,
					cuantos: conteo
				 });
			 } )

	
		   })
})
app.post('/usuario', function (req, res) {
	  let body = req.body;
	  let usuario = new Usuario({
		  nombre:   body.nombre,
		  email:    body.email,
		  password: bcrypt.hashSync(body.password, 10),
		  role:     body.role
	  });
	  usuario.save( (err, UsuarioDB ) => {
			 if ( err ){
				return  res.status(400).json({
					 ok: false,
					 err
				 });
			 }
			// UsuarioDB.password = null;
			 res.json({
				 ok:true,
				 usuario: //UsuarioDB
				 {
					nombre: UsuarioDB.nombre,
					email:  UsuarioDB.email,
					role: UsuarioDB.role,
					estado: UsuarioDB.estado,
					google: UsuarioDB.google,
					id: UsuarioDB._id,
					version: UsuarioDB.__v
				 }
			 })
	  });

})
	 
app.put('/usuario/:id', function (req, res) {
	
	  let id = req.params.id;
	  let body = _.pick(req.body, ['nombre','email', 'img', 'role','estado'] );
	

	  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true}, (err, usuarioDB) => {
		if ( err ){
			return  res.status(400).json({
				 ok: false,
				 err: err
			 });
		 }
		
		res.json({
			ok: true,
			usuario: usuarioDB
		});
	  })


})
	 
app.delete('/usuario/:id', function (req, res)  { // :id significa que busca los valores por parametros en la url y no por Body
	  let id = req.params.id;                   // ejemplo: {{url}}/usuario/5f2ef2a4cf3d160fecf511a4

	  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
		if ( err ){
			return  res.status(400).json({
				 ok: false,
				 err
			 });
		 };

		if ( !usuarioBorrado ){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Usuario no encontrado'
				}
			})
		}

		 res.json({
			ok: true,
			usuario: usuarioBorrado
		 });

	  });
})
  
app.delete( '/usuario/inactivar/:id', function (req, res) {
	let id = req.params.id;                   // ejemplo: {{url}}/usuario/5f2ef2a4cf3d160fecf511a4
	// let body = _.pick(req.body, ['nombre','estado'] );
	let cambiaEstado ={
		estado: false
	}
	Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioInactivado) => {  //{new: true} Permite cambiar el valor en la BD
		if ( err ){
			return  res.status(400).json({
				 ok: false,
				 err
			 });
		 };
		
		return res.json({
			ok: true,
			estado:'inactivado',
			usuario: {
				estado: usuarioInactivado.estado,
				nombre: usuarioInactivado.nombre,
				
			} 
		})
	})
	


})


module.exports = app;