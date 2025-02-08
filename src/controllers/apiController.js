const model = require('../models/apiModel')

module.exports = {
    createSingleApi : (req, res,next) => {
        const data = {
            user_id : res.locals.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json(`createSingleApi: ${error}`)
            }else{
                next()
            }
        }
        
        model.insertSingleApi(data, callback)
    },
    getApiByUserId : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json(`getApiByUserId: ${error}`)
            }else{
                res.locals.currency_status = results[0].currency_status
                res.locals.inventory_status = results[0].inventory_status
                next()
            }
        }
        if(req.params.receiver_id){
            model.getApiByUserId({user_id : req.params.receiver_id},callback)
        }else{
            model.getApiByUserId(data,callback)
        }
    },
    sendApi : (req, res, next) => {
        res.status(200).json({
            currency_status : res.locals.currency_status,
            inventory_status : res.locals.inventory_status
        })
    },
    updateApi : (req, res, next) => {
        const data = req.body // includes .user_id .currency_status .inventory_status

        const callback = (error, results, fields) => {
        if(data.currency_status == undefined || data.inventory_status == undefined){
            res.status(400).json({message : "Missing currency or inventory status"})
        }else if(error){
            res.status(500).json({message : `updateApi: ${error}`})
        }else{
            res.status(200).json({message : "Account successfully updated"})
        }
        }

        model.updateApiByUserId(data, callback)
        
    }

}