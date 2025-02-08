const model = require('../models/tradeModel')

module.exports = {
    spamHandler : (req, res, next) => {
        const data = req.params//user_id1 user_id2
        const callback = (error, results, fields) => {
            if(results[0].length >= 5){
                res.status(429).json({message : `You have sent too many trade requests`})
            }else if(results[1].length >= 15){
                res.status(429).json({message : `User ${data.user_id2} has received too many trade requests`})
            }else if(error){
                res.status(500).json({message : `spamHandler: ${error}`})
            }else{
                next()
            }
        }
        model.selectTradeByBothUserId(data, callback)
    },
    checkOwnership : (req, res, next) => {
        const data = {
            ...req.params,//user_id1 user_id2
            ...req.body//coin1 diamond1 inventory_id1 coin2 diamond2 inventory_id2
        }
        const callback = (error, results, fields) => {
            const currency1 = results[0].find(obj => obj.user_id == data.user_id1)
            const currency2 = results[0].find(obj => obj.user_id == data.user_id2)
            var inventory1, inventory2
            if(data.invenotry_id1 != '0'){
                inventory1 = results[1].find(obj => obj.inventory_id == data.invenotry_id1)
                res.locals.inventory1 = inventory1
            }
            if(data.invenotry_id2 != '0'){
                inventory2 = results[2].find(obj => obj.inventory_id == data.invenotry_id2)
                res.locals.inventory2 = inventory2
            }

            if(data.coin1 != "" && currency1.coin < data.coin1){
                res.status(403).json({message : "You do not have enough coins to trade"})
            }else if(data.diamond1 != "" && currency1.diamond < data.diamond1){
                res.status(403).json({message : "You do not have enough diamonds to trade"})
            }else if(data.inventory_id1 != 0 && inventory1 != 0){
                res.status(404).json({message : `You do not own this item`})
            }else{
                next()
            }
        }
        model.selectBothInventoryAndCurrency(data, callback)
    },
    getTradeByTradeId : (req, res, next) => {
        const data = req.params //trade_id
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : `Trade request not found`})
            }else if(error){
                res.status(500).json({message : `getTradeByTradeId: ${error}`})
            }else{
                res.locals.user_id1 = results[0].user_id1
                res.locals.user_id2 = results[0].user_id2
                res.locals.coin1 = results[0].coin1
                res.locals.coin2 = results[0].coin2
                res.locals.diamond1 = results[0].diamond1
                res.locals.diamond2 = results[0].diamond2
                res.locals.inventory1 = results[0].inventory1
                res.locals.inventory2 = results[0].inventory2
                next()
            }
        }
        model.selectTradeByTradeId(data, callback)
    },
    closeTrade : (req, res, next) => {
        const data = req.params //trade_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `closeTrade: ${error}`})
            }else{
                res.status(200).json({message : "Trade Closed"})
            }
        }
        model.deleteTradeById(data, callback)
    },
    createPendingTrade : (req, res, next) => {
        const data = {
            ...req.params,//user_id1 user_id2
            ...req.body//coin1 diamond1 inventory_id1 coin2 diamond2 inventory_id2
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `createPendingTrade: ${error}`})
            }else{
                res.status(201).json({message : `Trade request made`})
            }
        }
        model.insertSingleTrade(data, callback)
    },
    getTradesByReceiverId : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getTradesByReceiverid: ${error}`})
            }else{
                res.locals.trades = results
                next()
            }
        }
        model.selectTradeByUserId(data, callback)
    },
    sendTrade : (req, res, next) => {
        res.status(200).json({
            user_id1:res.locals.user_id1,
            user_id2:res.locals.user_id2,
            coin1:res.locals.coin1,
            coin2:res.locals.coin2,
            diamond1:res.locals.diamond1,
            diamond2:res.locals.diamond2,
            inventory1:res.locals.inventory1,
            inventory2:res.locals.inventory2,
            lootPool : res.locals.lootPool
        })
    }
}