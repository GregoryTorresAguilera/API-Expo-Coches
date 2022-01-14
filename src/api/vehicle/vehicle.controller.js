const Vehicle = require('./vehicle.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')

 const postNewVehicle = async (req, res, next) => {
    try {
        const newVehicle = new Vehicle()
        newVehicle.name = req.body.name
        newVehicle.brand = req.body.brand
        newVehicle.type = req.body.type
        newVehicle.year = req.body.year
        if (req.file) {
            newVehicle.img = req.file.path
        }
        const vehicleDB = await newVehicle.save()
        return res.status(201).json(vehicleDB)
    } catch (error) {
        return next(setError(500, 'Vehicle not saved'))
    }
} 

const getAllVehicles = async (req, res, next) => {
    try {
        const vehiclesDB = await Vehicle.find()
        res.status(200).json(vehiclesDB)
    } catch (error) {
        return next(setError(500, 'Vehicle failed server'))
    }
}

const getVehicle = async (req, res, next) => {
    try {
        const { id } = req.params
        const vehicleDB = await Vehicle.findById(id)
        if (!vehicleDB) {
            return next(setError(404, 'Vehicle not found'))
        }
        return res.status(200).json(vehicleDB)
    } catch (error) {
        return next(setError(500, 'Vehicle server error'))
    }
}

const getVehicleFilter = async (req, res, next) => {
    const { type } = req.params
    try {
        console.log(type);
        const vehicleDB = await Vehicle.find({
            type
        })/* .populate('vehicles') */
        if (!vehicleDB) {
            return next(setError(404, ` ${id} not found`))
        }
        return res.status(200).json(vehicleDB)
    } catch (error) {
        return next(setError(500, 'Vehicles server error'))
    }
}


const patchVehicle = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchVehicle = new Vehicle(req.body)
        patchVehicle._id = id
        if (req.file) {
            patchVehicle.img = req.file.path
        }
        const vehicleDB = await Vehicle.findByIdAndUpdate(id, patchVehicle)

        if (!vehicleDB) {
            return next(setError(404, 'Vehicle not found'))
        }
        if (vehicleDB.img) deleteFile(vehicleDB.img)
        return res.status(200).json({ new: patchVehicle, old: vehicleDB })
    } catch (error) {
        return next(setError(500, 'Vehicle Patch server error'))
    }
}


const deleteVehicle = async (req, res, next) => {
    try {
        const { id } = req.params
        const vehicleDB = await Vehicle.findByIdAndDelete(id)
        if (!vehicleDB) {
            return next(setError(404, 'Vehicle not found'))
        }
        if (vehicleDB.img) deleteFile(vehicleDB.img)
        return res.status(200).json(vehicleDB)
    } catch (error) {
        return next(setError(500, 'Vehicle removed server error'))
    }
}

module.exports = {
    getVehicleFilter,
    postNewVehicle,
    getAllVehicles,
    getVehicle,
    patchVehicle,
    deleteVehicle
}