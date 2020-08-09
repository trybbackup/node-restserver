require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())
// App.use es un midellwares 
app.use( require('./routes/usuario') ) // importar la API
/*Mongo DB*/
mongoose.connect(process.env.URLDB, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true }, //, useCreateIndex:true 
	(err, res) =>{
		if ( err ) throw err;
		console.log('Base de datos ONlINE!!');
	}
);
app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
});