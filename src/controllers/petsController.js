const model = require("../models/petsModel")

module.exports = {
    getAllPets : (req, res, next) => {
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getAllPets, ${error}`})
            }else{
                res.status(200).json(results)
            }
        }

        model.selectAllPets(callback)
    }
    ,
    getPetsById : (req, res, next) => {
        const data = req.params // includes .pet_id
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "Pet not found"})
            }else if(data.user_id != undefined){
                res.locals.petFind = results
                next()
            }else{
                res.status(200).json(results[0])
            }
        }

        model.selectPetsById(data, callback)
    },
    postSinglePets : (req, res, next) => {
        const data = req.body //includes .name .hp .dmg .dmg_offset .cost_coin .cost_diamond
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `postSinglePets, ${error}`})
            }else if (data.name == undefined || data.hp == undefined || data.dmg == undefined || data.dmg_offset == undefined
                        || data.cost_coin == undefined || data.cost_diamond == undefined)
            {
                res.status(400).json({message : "Missing content in body"})
            }else{
                res.status(201).json({message : "Pet created",
                                        insertId : results.insertId})
            }
        }

        model.selectAllPets((error, results, fields) => {
            findDupe = results.find(obj => obj.name == data.name)
            if(findDupe != undefined){
                res.status(409).json({message : "Pet with the same name exists"})
            }else{
                model.insertSinglePets(data,callback)
            }
        })
        
    },
    putPets : (req, res, next) => {
        const data = {...req.params,// includes .pet_id
                        ...req.body} //includes .name .hp .dmg .dmg_offset .cost_coin .cost_diamond
        const callback = (error, results, fields) => {
            if(data.name == undefined || data.hp == undefined || data.dmg == undefined || data.dmg_offset == undefined
                || data.cost_coin == undefined || data.cost_diamond == undefined)
            {
                res.status(400).json({message : "Missing content in body"})
            }else if(results.affectedRows == 0){
                res.status(404).json({message : `Pet with pet_id ${data.pet_id} does not exist`})
            }else{
                res.status(200).json({message : "Pet updated",
                                    updated_Pets : data})
            }
        }

        model.updatePets(data, callback)
    },
    deletePets : (req, res, next) => {
        const data = req.params //includes .pet_id
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `deletePets, ${error}`})
            }else if(results[0].affectedRows == 0){
                res.status(404).json({message : "Pet not found"})
            }else{
                res.status(204).json()
            }
        }
        model.deletePets(data,callback)
    },
    getPetsByIdMiddleware : (req, res, next) => {
        const data = req.params // includes .pet_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getPetsByIdMiddleware: ${error}`})
            }else{
                res.locals.petFind = results[0]
                next()
            }
        }
        if(data.pet_id == undefined){
            model.selectPetsById({pet_id : res.locals.currency.pet_id}, callback)
        }else{
            model.selectPetsById(data, callback)
        }
    },
    getPetsBySimilarName : (req, res, next) => {
        const data = req.params // include  .name
        const callback = (error, results, fields) => {
            if(results.length ==0){
                res.status(404).json({message : "No pet with similar name"})
            }else if(error){
                res.status(500).json({message : `getPetsBySimilarName: ${error}`})
            }else{
                res.status(200).json(results)
            }
        }
        model.selectPetBySimilarName(data, callback)
    }
}