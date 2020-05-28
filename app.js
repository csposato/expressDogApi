const express = require("express");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
    nombre:'',
    apellido: ''
};
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

let callOptions = {
    method: 'GET',
    headers: '',
    mode: 'cors',
    cache: 'default'
};

const url = 'https://dog.ceo/api/breeds/list/all';

app.get('/', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

app.route('/external')
    .get(function (req, res) {
        fetch(url, callOptions)
            .then(function(response) {
                console.log('Calling ', url);
                return response.json();
            })
            .then(function(data) {
                console.log('Sending data...');
                res.send(data);
                console.log('Data ok!');
            })
            .catch(function(err) {
                console.error('Error: ' + err);
            });
    });

app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

app.listen(4000, () => {
    console.log("El servidor está inicializado en el puerto 4000");
});