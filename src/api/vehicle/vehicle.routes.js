const VehicleRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewVehicle, getAllVehicles, getVehicle, patchVehicle, deleteVehicle, getVehicleFilter} = require('./vehicle.controller')


VehicleRoutes.get('/', getAllVehicles)
VehicleRoutes.get('/:id', getVehicle)
VehicleRoutes.get('/filter/:type', getVehicleFilter)
//VehicleRoutes.post('/', [isAuth], upload.single('img'), postNewVehicle)
//VehicleRoutes.patch('/:id', [isAuth], upload.single('img'), patchVehicle)
//VehicleRoutes.delete('/:id', [isAuth], upload.single('img'), deleteVehicle)

module.exports = VehicleRoutes