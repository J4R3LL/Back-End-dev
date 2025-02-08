const model = require("../models/questModel")

module.exports = {
    getAllQuest : (req, res, next) => {
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getAllQuest, ${error}`})
            }else{
                res.status(200).json(results)
            }
        }

        model.selectAllQuest(callback)
    }
    ,
    getQuestById : (req, res, next) => {
        const data = req.params // includes .quest_id
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "Quest not found"})
            }else{
                res.status(200).json(results[0])
            }
        }

        model.selectQuestById(data, callback)
    },
    postSingleQuest : (req, res, next) => {
        const data = req.body //includes .title .description .tier
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `postSingleQuest, ${error}`})
            }else if (data.title == undefined || data.description == undefined || data.tier == undefined){
                res.status(400).json({message : "Missing content in body"})
            }else{
                res.status(201).json({message : "Quest created",
                                        insertId : results.insertId})
            }
        }

        model.selectAllQuest((error, results, fields) => {
            findDupe = results.find(obj => obj.title == data.title)
            if(findDupe != undefined){
                res.status(409).json({message : "Quest with the same title exists"})
            }else{
                model.insertSingleQuest(data,callback)
            }
        })
        
    },
    putQuest : (req, res, next) => {
        const data = {...req.params,// includes .quest_id
                        ...req.body} // includes .title .description .tier
        const callback = (error, results, fields) => {
            if(data.title == undefined || data.description == undefined || data.tier == undefined){
                res.status(400).json({message : "Missing content in body"})
            }else if(results.affectedRows == 0){
                res.status(404).json({message : `Quest with pet_id ${data.quest_id} does not exist`})
            }else {
                res.status(200).json({message : "Quest updated",
                                    updated_quest : data})
            }
        }

        model.updateQuest(data, callback)
    },
    deleteQuest : (req, res, next) => {
        const data = req.params //includes .quest_id
        const callback = (error, results, fields) => {
            if (error){
                console.error(error)
                res.status(500).json({message : `deleteQuest, ${error}`})
            }else if(results[0].affectedRows == 0){
                res.status(404).json({message : "Quest not found"})
            }else{
                res.status(204).json()
            }
        }
        model.deleteQuest(data,callback)
    },
    getQuestBySimilarTitle : (req, res, next) => {
        const data = req.params //include .title
        const callback = (error, results, fields) => {
            if(results.length ==0 ){
                res.status(404).json({message : "No quest with similar title"})
            }else if(error){
                res.status(500).json({message : `getQuestBySimilarTitle: ${error}`})
            }else{
                res.status(200).json(results)
            }
        }
        model.selectQuestBySimilarTitle(data, callback)
    }
}