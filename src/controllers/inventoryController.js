const model = require("../models/inventoryModel")
const lootPoolModel = require('../models/lootPoolModel')
const currencyModel = require('../models/currencyModel')
const crypto = require('crypto');
const async = require('async');



module.exports = {
    getInventoryByUserId : (req, res, next) => {
        const data = req.params // includes .user_id
        const callback = (error, results, fields) => {
            if(error){
                res.stats(500).json({message : `getInventoryByUserId, ${error}`})
            }else{
                res.status(200).json(results)
            }
        }

        model.selectInventoryByUserId(data, callback)
    },
    getInventoryProfileByUserId : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.stats(500).json({message : `getInventoryByUserId, ${error}`})
            }else{
                res.locals.inventory=results
                next()
            }
        }

        model.selectInventoryByUserId(data,callback)
    },
    createInventory : (req, res, next) => {
        const data = {user_id : res.locals.user_id}

        //Random number generator
        function RNG(){
            const min = 1
            const max = 2**32
            const range = max - min + 1
            
            const randomValue = crypto.randomInt(min, max)

            
            if(randomValue < Math.ceil((max - min + 1) * 0.0001)){
                return 5
            }else if(randomValue < Math.ceil((max - min + 1) * 0.003)){
                return 4
            }else if(randomValue < Math.ceil((max - min + 1) * 0.05)){
                return 3
            }else if(randomValue < Math.ceil((max - min + 1) * 0.2)){
                return 2
            }else{
                return 1
            }
        }

        var tasks = [];

        var EarnedLoot = []
        var insertIds = []
        var currencyEarned = {coin : 0, diamond : 0}

            
        for(var i = 0; i < res.locals.tier; i++){
            tasks.push((callback) => {
            const insertInventoryCallback = (error, results, fields) => {
            if(error){
                if(!res.headersSent){
                res.status(500).json({message : `createSingleInventory, ${error}`})
                }
            }else{
                insertIds.push(results.insertId)
                EarnedLoot.push(results[randomIndex])
                callback()
            }
            }

            lootPoolModel.getLootByRarity({rarity : RNG()},(error, results, fields) => {
                if(error){
                    res.status(500).json({message : `getLootByRarity, ${error}`})
                }else{
                    if(results.length == 1){
                        var randomIndex = 0
                    }else{
                        var randomIndex = crypto.randomInt(0, results.length - 1);
                    }
                    const lootName = results[randomIndex].name.split(" ")


                    const addCurrencyCoin = (error, results, fields) => {
                        if(error){
                            if(!res.headersSent){
                            res.status(500).json({message : `createInventory, ${error}`})
                        }}else{
                            currencyEarned.coin += parseInt(lootName[1])
                            callback()
                        }
                     }
                 
                    const addCurrencyDiamond = (error, results, fields) => {
                        if(error){
                            if(!res.headersSent){
                            res.status(500).json({message : `createInventory, ${error}`})
                        }}else{
                            currencyEarned.diamond += parseInt(lootName[1])
                            callback()
                        }
                     }

                    if(lootName[0] == "coin" || lootName[0] == "diamond"){
                        if(lootName[0] == "coin"){
                            currencyModel.updateCurrencyCoin({...data, ...{coin : parseInt(lootName[1])} }, addCurrencyCoin)                             
                        }else{
                            currencyModel.updateCurrencyDiamond({...data, ...{diamond : parseInt(lootName[1])} }, addCurrencyDiamond)
                        }
                    }else{
                        model.insertInventory({...data,...{loot_id : results[randomIndex].loot_id}}, insertInventoryCallback)
                    }
                }

            })
        })
        }

        async.parallel(tasks, (callback) => {
                if(!res.headersSent){
                    res.status(201).json({message : "Quest Claimed",
                                        taskProgressInsertId : res.locals.insertId,
                                        EarnedLoot : EarnedLoot,
                                        respectiveInsertId : insertIds,
                                        currencyEarned : currencyEarned})
                }
        })

    },
    deleteSingleInventory : (req, res, next) => {
        const data = req.params // inclues .inventory_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `deleteSingleInventory, ${error}`})
            }else{
                res.status(204).json()
            }
        }

        model.deleteSingleInventory(data, callback)
    },
    tradeInventory : (req, res, next) => {
        const data = req.params // includes .user_id1 .inventory_id1 .user_id2 .inventory_id2
        const callback = (error, results, fields) => {

        }

        model.selectInventoryByUserId({user_id : data.user_id1}, (error, results, fields) => {
            const findInventory1 = results.filter(obj => obj.inventory_id == data.inventory_id1)
            if(findInventory1.length == 0){
                res.status(404).json({message : `User ${data.user_id1} does not own inventory ${data.inventory_id1} or inventory ${data.inventory_id1} does not exist`})
            }else if(inventory_id2 == 0){
                model.updateInventoryUser({user_id : data.user_id2, inventory_id : data.inventory_id1}, (error, results,fields) => {
                    if(error){
                        res.status(500).json({message : `updateInventoryUser, ${error}`})
                    }else{
                    res.status(200).json({message : `Inventory ${data.inventory_id1} gifted to User ${data.user_id2} by User ${data.user_id1}`})
                    }
                })

            }else{
                model.selectInventoryByUserId({user_id : data.user_id1}, (error, results, fields) => {
                    const findInventory2 = results.filter(obj => obj.inventory_id == data.inventory_id2)
                    if(findInventory2.length == 0){
                        res.status(404).json({message : `User ${data.user_id2} does not own inventory ${data.inventory_id2} or inventory ${data.inventory_id2} does not exist`})
                    }
                    model.updateInventoryUser({user_id : data.user_id2, inventory_id : data.inventory_id1}, (error, results, fields) => {
                        if(error){
                            res.status(500).json({message : `1st updateInventoryUser, ${error}`})
                        }else{
                            model.updateInventoryUser({user_id : data.user_id1, inventory_id : data.inventory_id2}, (error, results, fields) => {
                                if(error){
                                    res.status(500).json({message : `2nd updateInventoryUser, ${error}`})
                                }else{
                                    res.status(200).json({message : `User ${data.user_id1} traded inventory ${data.inventory_id1} for inventory ${data.inventory_id2} with User ${data.user_id2}`})
                                }
                            })
                        }
                    })
                })
            }
        })
    },
    updateInventoryOwner : (req, res, next) => {
        const data = {
            user_id1 : res.locals.user_id1,
            user_id2 : res.locals.user_id2
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `updateInventoryOwner: ${error}`})
            }else{
                next()
            }
        }
        if(res.locals.inventory1 && res.locals.inventory2){
            model.updateInventoryUser({
                user_id : data.user_id2,
                inventory_id : res.locals.inventory1},
                (error, results, fields) => {
                    if(error){
                        res.status(500).json({message : `updateInventoryOwner: ${error}`})
                    }else{
                        model.updateInventoryUser({
                            user_id : data.user_id1,
                            inventory_id : res.locals.inventory2
                        }, callback)
                    }
                })
        }else if(res.locals.inventory1){
            model.updateInventoryUser({user_id : data.user_id1,inventory_id : res.locals.inventory1}, callback)
        }else if(res.locals.inventory2){
            model.updateInventoryUser({user_id : data.user_id2,inventory_id : res.locals.inventory2}, callback)
        }else{
            next()
        }
    },
    getTradeInventory : (req, res, next) => {
        const data = req.params //includes .requester_id .receiver_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getTradeInventory: ${error}`})
            }else{
                res.status(200).json({
                    requesterCurrency : res.locals.requesterCurrency,
                    receiverCurrency : res.locals.receiverCurrency,
                    requesterInventory : results[0],
                    receiverInventory : results[1],
                    currency_status : res.locals.currency_status,
                    inventory_status : res.locals.inventory_status,
                    lootPool : res.locals.lootPool
                })
            }
        }
        model.selectTradeInventory(data,callback)
    }
}