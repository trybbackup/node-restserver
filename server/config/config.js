//==========================
//Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;
//=> Si esta variable no existe    then Estoy en localhost
//==========================
//Entorno
//==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//==========================
//Base de datos
//==========================
let urlDB;
if (process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}else
{                         // {DBUser}// {Password}
process.env.NODE_ENV.jon;
}
process.env.URLDB = urlDB;