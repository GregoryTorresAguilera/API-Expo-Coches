const ExpoRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewExpo, getAllExpos, getExpo, getExpoFilter } = require('./expo.controller')


ExpoRoutes.get('/', getAllExpos)
ExpoRoutes.get('/:id', getExpo)
ExpoRoutes.post('/', [isAuth], upload.single('img'), postNewExpo)
ExpoRoutes.get('/filter/:id', getExpoFilter)

//ejecutarlo en linea 4.
/* ExpoRoutes.patch('/:id', [isAuth], upload.single('img'), patchExpo)
ExpoRoutes.delete('/:id', [isAuth], upload.single('img'), deleteExpo) */

module.exports = ExpoRoutes