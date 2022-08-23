const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogs = require('./dogs')
const dogsIdRaza = require('./dogsIdRaza')
const postDogs = require('./postDogs')
const temperament = require('./temperament')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', dogs)  //cuando este en /dogs, se ejecuta dogs

router.get('/dogs/:idRaza', dogsIdRaza) //cuando este en /dogs/:idRaza, se ejecuta dogsIdRaza

router.post('/dog', postDogs)

router.get('/temperament', temperament)

module.exports = router;