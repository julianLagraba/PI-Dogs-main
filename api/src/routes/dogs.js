const axios = require("axios");
const { Dog, Temperamento } = require('../db');
const { Op } = require("sequelize");
const { response } = require("express");



const dogs = function(req, res) {
    if(req.query.name){
        const name = req.query.name;
        const info = [];
        axios.get('https://api.thedogapi.com/v1/breeds').then(response =>{
            response.data.forEach(element => {
                if(element.name.toLowerCase().includes(name.toLowerCase())){
                    info.push({
                        ID: element.id,
                        Nombre: element.name,
                        Temperamento: element.temperament?.split(', '),
                        Peso: element.weight.metric,
                        Altura: element.height.metric,
                        TiempoVida: element.life_span,
                        Imagen: element.image.url
                    })
                }
            })
            Dog.findAll({ include: Temperamento, where: { nombre:{ [Op.iLike]: `%${name}%`  } } }).then(resultado => {
            resultado.forEach(resultado => {
                info.push({
                    ID: resultado.id + 264,
                    Nombre: resultado.nombre,
                    Temperamento: resultado.temperamentos.map(temp => temp.nombre),
                    Peso: resultado.peso,
                    Altura: resultado.altura,
                    TiempoVida: resultado.tiempoVida,
                    Imagen: resultado.imagen
                })
            })
            return res.json(info)        
            })                        
        })
    .catch(error => res.status(500).json({error: 'no hay razas con ese nombre'}))
    }

    else {
        const info = [];
        axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
            response.data.forEach(element => {
                info.push({
                    ID: element.id,
                    Nombre: element.name,
                    Temperamento: element.temperament?.split(', '),
                    Peso: element.weight.metric,
                    Altura: element.height.metric,
                    TiempoVida: element.life_span,
                    Imagen: element.image.url
                })
            })
        Dog.findAll({include: Temperamento}).then(resultado => {
            resultado.forEach(resultado => {
                info.push({
                    ID: resultado.id + 264,
                    Nombre: resultado.nombre,
                    Temperamento: resultado.temperamentos.map(temp => temp.nombre),
                    Peso: resultado.peso,
                    Altura: resultado.altura,
                    TiempoVida: resultado.tiempoVida,
                    Imagen: resultado.imagen
                })
            })
            return res.json(info)
        })
    })
}
}

module.exports = dogs