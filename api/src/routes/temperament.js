const axios = require("axios").default
const {Temperamento} = require('../db')

const temperament = function(req, res, next) {

    let temperamentos = [];

    Temperamento.findAll().then(response => {
        if(!response.length){
            axios.get('https://api.thedogapi.com/v1/breeds').then(response => {
                response.data.forEach(dog => {
                    
                    dog.temperament?.split(', ').forEach(temp => {const a = temperamentos.find(x => temp === x)
                    
                        if(a) {
                            temperamentos.push(temp);
                        }
                    })
                });
                    temperamentos.forEach(temp => Temperamento.create({nombre:temp}))
                    return res.status(200).json(temperamentos);
            })
           
        }else{
            return res.ststus(200).json(response.map(x => x.nombre));
        }
    })
}
module.exports = temperament;