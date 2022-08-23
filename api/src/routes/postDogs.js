const axios = require("axios").default;
const { Dog, Temperamento } = require('../db');

const postDogs = function (req, res, next) {
    const {nombre, temperamentos, peso, altura, tiempoVida, imagen} = req.body;

    if(imagen === '') {
        imagen = 'https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=2000'
    }

    Dog.findOrCreate({
        where: {nombre},
        defaults: {nombre:nombre, peso:peso, altura:altura, tiempoVida:tiempoVida, imagen:imagen}
    }).then(([dog, created]) => {

        if(created) {
            dog.setTemperamentos(temperamentos)
        }
        res.status(200).json({message: 'raza agregada', dog, created})
    })
    .catch(err => next(err))
}

module.exports = postDogs;