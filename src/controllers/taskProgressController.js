const model = require('../models/taskProgressModel')
const userModel = require('../models/userModel')
const questModel = require('../models/questModel')

module.exports = {
    createTaskProgress : (req, res, next) => {
        const data = req.body //includes .user_id (.task_id or .quest_id) .completion_date .notes
        const callback = (error, results, fields) => {
            if(error){
                console.error("Error createTaskProgress: ", error)
                res.status(500).json(error)
            }else{
                model.selectAllTaskProgress((error, results, fields) => {
                    res.status(201).json(results.slice(-1)[0])
                })
            }
        }
        
        
        if(data.task_id != undefined){//task part
            //find task by id
            taskModel.selectTaskById({task_id : data.task_id},(error, results, fields) =>{
                const taskFind = results

            //find user by id
            userModel.selectUserById({user_id : data.user_id},(error, results, fields) => {
                const userFind = results

                //check whether user and task exists
                if(userFind.length == 0 || taskFind.length == 0){
                    res.status(404).json({message : `user_id ${data.user_id} or task_id ${data.task_id} does not exist`})
                }else if(data.completion_date == undefined){
                    res.status(400).json({message: "completion_date missing from request body"})
                }else{
                    model.insertSingleTaskProgress(data,callback)
                }

            })
            })
        }else{ //quest part
            //find user by id
            userModel.selectUserById({user_id : data.user_id},(error, results, fields) => {
                const userFind = results

            //find quest by id
            questModel.selectQuestById({quest_id : data.quest_id}, (error, results, fields) => {
                const questFind = results

                //check whether user and task exists
                if(userFind.length == 0 || questFind.length == 0){
                    res.status(404).json({message : `user_id ${data.user_id} or quest_id ${data.quest_id} does not exist`})
                }else if(data.completion_date == undefined){
                    res.status(400).json({message: "completion_date missing from request body"})
                }else{
                    model.insertSingleTaskProgress({...data,...{task_id : data.quest_id}},(error, results, fields) => {
                        if(error){
                            console.error("Error createTaskProgress: ", error)
                            res.status(500).json(error)
                        }else{
                            res.locals.user_id = data.user_id
                            res.locals.tier = questFind[0].tier
                            res.locals.insertId = results.insertId
                            next()
                        }
                    })
                }

            })
            })
        }

    },

    getTaskProgressById : (req, res, next) => {
        const data = req.params //includes .progress_id
        const callback = (error, results, fields) => {
            if(results.length==0){
                res.status(404).json({message:`Task Progress ${data.progress_id} not found`})
            }else{
                res.status(200).json(results[0])
            }
        }
        
        model.selectTaskProgressById(data,callback)
    },

    putTaskProgress : (req, res, next) => {
        const data = {...req.params, //includes .progress_id
                      ...req.body} //includes .notes
        const callback = (error, results, fields) => {
            if(data.notes == undefined){
                res.status(400).json({message : "notes missing from request body"})
            }else{
                model.selectTaskProgressById({progress_id : data.progress_id},(error,results,fields) => {
                    res.status(200).json(results[0])
                })
            }
        }

        model.selectTaskProgressById({progress_id : data.progress_id},(error,results,fields) => {
            if(results.length == 0){
                res.status(404).json({message : `Task Progress ${data.progress_id} not found`})
            }else{
                model.updateTaskProgress(data,callback)
            }
        })

    },

    deleteTaskProgress : (req, res,next) => {
        const data = req.params // includes .progress_id
        const callback = (error, results, fields) => {
            if(results.affectedRows == 0){
                res.status(404).json({message : `Task Progress ${data.progress_id} does not exist`})
            }else{
                res.status(204).json()
            }
        }

        model.deleteTaskProgress(data, callback)
    },
    claimQuest : (req, res, next) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const data = {
            user_id : res.locals.userId,
            quest_id : req.body.quest_id,
            completion_date : `${year}/${month}/${day}`
        }
        //find user by id
        userModel.selectUserById({user_id : data.user_id},(error, results, fields) => {
            const userFind = results

        //find quest by id
        questModel.selectQuestById({quest_id : data.quest_id}, (error, results, fields) => {
            const questFind = results
            //check whether user and task exists
            if(userFind.length == 0 || questFind.length == 0){
                res.status(404).json({message : `user_id ${data.user_id} or quest_id ${data.quest_id} does not exist`})
            }else if(data.completion_date == undefined){
                res.status(400).json({message: "completion_date missing from request body"})
            }else{
                model.insertSingleTaskProgress({...data,...{task_id : data.quest_id}},(error, results, fields) => {
                    if(error){
                        console.error("Error createTaskProgress: ", error)
                        res.status(500).json(error)
                    }else{
                        res.locals.user_id = data.user_id
                        res.locals.tier = questFind[0].tier
                        res.locals.insertId = results.insertId
                        next()
                    }
                })
            }

        })
        })
    },
    verifyCompletion : (req, res, next) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const data = {
            user_id : res.locals.userId,
            quest_id : req.body.quest_id,
            completion_date : `${year}/${month}/${day} 00:00:00`
        }
        const callback = (error, results, fields) => {
            if(results.length != 0){
                res.status(403).json({message : `You have claimed this quest today`})
            }else{
                next()
            }
        }

        model.selectTaskProgressByUserIdTaskIdAndDate(data, callback)
    }
}