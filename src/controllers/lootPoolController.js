const model = require("../models/lootPoolModel")

module.exports = {
    getAllLoot : (req, res, next) => {
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getAllLoot, ${error}`})
            }else{
                res.status(200).json(results)
            }
        }
        model.selectAllLoot(callback)
    },
    getAllLootMiddleware : (req, res, next) => {
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getAllLootMiddleware: ${error}`})
            }else{
                res.locals.lootPool = results
                next()
            }
        }
        model.selectAllLoot(callback)
    },
    getLootById : (req, res, next) => {
        const data = req.params // includes .loot_id
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "Loot not found"})
            }else{
                res.status(200).json(results[0])
            }
        }

        model.selectLootById(data, callback)
    },
    postSingleLoot : (req, res, next) => {
        const data = req.body //includes .name .rarity
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `postSingleLoot, ${error}`})
            }else if (data.name == undefined || data.rarity == undefined){
                res.status(400).json({message : "Missing content in body"})
            }else{
                res.status(201).json({message : "Loot created",
                                        insertId : results.insertId})
            }
        }

        model.selectAllLoot((error, results, fields) => {
            findDupe = results.find(obj => obj.name == data.name)
            if(findDupe != undefined){
                res.status(409).json({message : "Loot with the same title exists"})
            }else{
                model.insertSingleLoot(data,callback)
            }
        })
        
    },
    putLoot : (req, res, next) => {
        const data = {...req.params,// includes .loot_id
                        ...req.body} // includes .title .description .tier
        const callback = (error, results, fields) => {
            if(data.name == undefined || data.rarity == undefined){
                res.status(400).json({message : "Missing content in body"})
            }else if(results.affectedRows == 0){
                res.status(404).json({message : `loot with loot_id ${data.loot_id} does not exist`})
            }else{
                res.status(200).json({message : "Loot updated",
                                    updated_Loot : data})
            }
        }

        model.updateLoot(data, callback)
    },
    deleteLoot : (req, res, next) => {
        const data = req.params //includes .loot_id
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `deleteLoot, ${error}`})
            }else if(results[0].affectedRows == 0){
                res.status(404).json({message : "Loot not found"})
            }else{
                res.status(204).json()
            }
        }
        model.deleteLoot(data,callback)
    },
    getLootBySimilarName : (req, res, next) => {
        const data = req.params // include .name
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "No Loot with similar name"})
            }else if(error){
                res.status(500).json({message : `getLootBySimilarName: ${error}`})
            }else{
                res.status(200).json(results)
            }
        }
        model.selectLootBySimilarName(data, callback)
    }
}