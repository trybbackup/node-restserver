require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())
// App.use es un midellwares 
app.get('/usuario', function (req, res) {
  res.json('GET usuario')
  //res.send  => Es un HTML
  //res.json  => Es un JSON
})
 
app.post('/usuario', function (req, res) {
	let body = req.body;
	if ( body.nombre === undefined){
		res.status(400).json({
			ok: false,
			mensaje: 'El nombre es necesario'
		})
	}
	res.json({
		persona:body
	});
	
})
   
app.put('/usuario/:id', function (req, res) {
	let id = req.params.id;
	res.json({
		id
	});
})
   
app.delete('/usuario', function (req, res) {
	res.json('DELETE usuario')
})

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', 3000);
});