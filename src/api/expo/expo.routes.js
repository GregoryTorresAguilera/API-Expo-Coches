const ExpoRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewExpo, getAllExpos, getExpo, getExpoFilter } = require('./expo.controller')

ExpoRoutes.get('/',[isAuth], getAllExpos)
ExpoRoutes.get('/:id',[isAuth], getExpo)
ExpoRoutes.get('/filter/:country', [isAuth], getExpoFilter)

/* ExpoRoutes.post('/', [isAuth], upload.single('img'), postNewExpo)
ExpoRoutes.patch('/:id', [isAuth], upload.single('img'), patchExpo)
ExpoRoutes.delete('/:id', [isAuth], upload.single('img'), deleteExpo)  */

module.exports = ExpoRoutes