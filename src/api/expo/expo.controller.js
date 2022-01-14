const Expo = require('./expo.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewExpo = async (req, res, next) => {
    try {
        const newExpo = new Expo()
        newExpo.name = req.body.name
        newExpo.year = req.body.year
        newExpo.country = req.body.country
        newExpo.vehicles = req.body.vehicles
        if (req.file) {
            newExpo.img = req.file.path
        }
        const expoDB = await newExpo.save()
        return res.status(201).json(expoDB)
    } catch (error) {
        return next(setError(500, 'Expo not saved'))
    }
}

const getAllExpos = async (req, res, next) => {
    try {
        const exposDB = await Expo.find().populate('vehicles')
        res.status(200).json(exposDB)
    } catch (error) {
        return next(setError(500, 'Expo failed server'))
    }
}

const getExpo = async (req, res, next) => {
    try {
        const { id } = req.params
        const expoDB = await Expo.findById(id).populate('vehicles')
        if (!expoDB) {
            return next(setError(404, 'Expo not found'))
        }
        return res.status(200).json(expoDB)
    } catch (error) {
        return next(setError(500, 'Expo server error'))
    }
}

const getExpoFilter = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id);
        const expoDB = await Expo.find({
            country: id
        }).populate('vehicles')
        if (!expoDB) {
            return next(setError(404, ` ${id} not found`))
        }
        return res.status(200).json(expoDB)
    } catch (error) {
        return next(setError(500, 'Expo server error'))
    }
}



const patchExpo = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchExpo = new Expo(req.body)
        patchExpo._id = id
        if (req.file) {
            patchExpo.img = req.file.path
        }
        const expoDB = await Expo.findByIdAndUpdate(id, patchExpo)
        if (!expoDB) {
            return next(setError(404, 'Expo not found'))
        }
        if (expoDB.img) deleteFile(expoDB.img)
        return res.status(200).json({ new: patchExpo, old: expoDB })
    } catch (error) {
        return next(setError(500, 'Expo Patch server error'))
    }
}

const deleteExpo= async (req, res, next) => {
    try {
        const { id } = req.params
        const expoDB = await Expo.findByIdAndDelete(id)
        if (!expoDB) {
            return next(setError(404, 'Expo not found'))
        }
        if (expoDB.img) deleteFile(expoDB.img)
        return res.status(200).json(expoDB)
    } catch (error) {
        return next(setError(500, 'Expo removed server error'))
    }
}

module.exports = {
    postNewExpo,
    getAllExpos,
    getExpoFilter,
    getExpo,
    patchExpo,
    deleteExpo
}
