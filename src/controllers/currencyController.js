const model = require("../models/currencyModel")
const petsModel = require('../models/petsModel')
const crypto = require('crypto')

module.exports = {
    getCurrencyById : (req, res, next) => {
        const data = req.params // includes .user_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getCurrencyById, ${error}`})
            }else{
                res.status(200).json(results[0])
            }
        }

        model.selectCurrencyById(data, callback)
    },
    getCurrencyProfileById : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }
        const callback = (error, results, fileds) => {
            if(error){
                res.status(500).json({message : `getCurrencyProfileById, ${error}`})
            }else{
                res.locals.currency=results[0]
                next()
            }
        }

        model.selectCurrencyById(data, callback)
    },
    putPet : (req, res, next) => {
        const data = req.params // includes .user_id .pet_id
        const petFind = res.locals.petFind[0]

        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `putPet, ${error}`})
            }else{
                res.status(200).json({message : "Pet updated"})
            }
        }

        model.selectCurrencyById(data, (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "User does not exist"})
            }else if(results[0].coin < petFind.cost_coin || results[0].diamond < petFind.cost_diamond){
                res.status(403).json({message : "Not enough funds, do more quests"})
            }else{
                model.updateCurrencyCoin({...data, ...{coin : (-petFind.cost_coin)}}, (error, results, fields) => {
                    if(error){
                        res.status(500).json({message : `selectCurrencyById, ${error}`})
                    }
                })
                model.updateCurrencyDiamond({...data, ...{diamond : (-petFind.cost_diamond)}}, (error, results, fields) => {
                    if(error){
                        res.status(500).json({message : `selectCurrencyById, ${error}`})
                    }
                })
                model.updateCurrencyPet(data, callback)
            }
        })

    },
    petBattle : (req, res, next) => {
        const data = req.params // include .user_id1 .user_id2
        var winner, end

        model.selectCurrencyById({user_id : data.user_id1},(error, results, fields) => {
            if(error){
                res.status(500).json({message : `petBattle, ${error}`})
            }else if(results.length == 0){
                res.status(404).json({message : `User ${data.user_id1} not found`})
            }else{
            var user1 = results[0]}

        model.selectCurrencyById({user_id : data.user_id2},(error, results, fields) => {
            if(error){
                res.status(500).json({message : `petBattle, ${error}`})
            }else if(results.length == 0){
                res.status(404).json({message : `User ${data.user_id2} not found`})
            }else{
            var user2 = results[0]}

            petsModel.selectAllPets((error, results, fields) => {
                if(error){
                    res.status(500).json({message : `petBattle, ${error}`})
                }else if(user1.pet_id == null || user2.pet_id == null){
                    res.status(404).json({message : `User ${data.user_id1} or user ${data.user_id2} does not have a pet`})
                }else{
                pet1 = results.find(obj => obj.pet_id == user1.pet_id)
                pet2 = results.find(obj => obj.pet_id == user2.pet_id)
                do {
                    end = true
                    if(pet1.dmg_offset == 0 && pet2.dmg_offset == 0){
                        pet1.hp -= pet2.dmg
                        pet2.hp -= pet1.dmg
                    }else if(pet1.dmg_offset == 0){
                        pet1.hp -= crypto.randomInt(pet2.dmg-pet2.dmg_offset, pet2.dmg+pet2.dmg_offset)
                        pet2.hp -= pet1.dmg
                    }else if(pet2.dmg_offset == 0){
                        pet1.hp -= pet2.dmg
                        pet2.hp -= crypto.randomInt(pet1.dmg-pet1.dmg_offset, pet1.dmg+pet1.dmg_offset)
                    }else{
                        pet1.hp -= crypto.randomInt(pet2.dmg-pet2.dmg_offset, pet2.dmg+pet2.dmg_offset)
                        pet2.hp -= crypto.randomInt(pet1.dmg-pet1.dmg_offset, pet1.dmg+pet1.dmg_offset)
                    }
                    if(pet1.hp<0 && pet2.hp >= 0){
                        end = false
                        winner = data.user_id2
                    }else if(pet2.hp<0 && pet1.hp >= 0){
                        end = false
                        winner = data.user_id1
                    }else if(pet1.hp > pet2.hp){
                        end = false
                        winner = data.user_id1
                    }else if(pet1.hp < pet2.hp){
                        end = false
                        winner = data.user_id2
                    }else{
                        end = false
                        winner = undefined
                    }
                } while (end);

                if(winner == undefined){
                    res.locals.outcome = {
                        attacker_id : data.user_id1,
                        defender_id : data.user_id2,
                        status : "tie",
                        message : `Its a tie!`
                    }
                    next()
                }else if(winner == data.user_id1){
                    res.locals.outcome = {
                        attacker_id : data.user_id1,
                        defender_id : data.user_id2,
                        status : "win",
                        message : `You won User ${data.user_id2}!`
                    }
                    next()
                }else{
                    res.locals.outcome = {
                        attacker_id : data.user_id1,
                        defender_id : data.user_id2,
                        status : "lose",
                        message : `You lost to User ${data.user_id2}.`
                    }
                    next()
                }
                }
            })
        })
        })
    },
    createSingleCurrency : (req, res, next) => {
        const data = {
            user_id : res.locals.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `createSingleCurrency: ${error}`})
            }else{
                next()
            }
        }

        model.insertSingleCurrency(data, callback)
    },
    putPetWithToken : (req, res, next) => {
        const data = {
            user_id : res.locals.userId,
            pet_id : req.params.pet_id
        }
        const petFind = res.locals.petFind

        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `putPet, ${error}`})
            }else{
                res.status(200).json({message : "Pet updated"})
            }
        }

        model.selectCurrencyById(data, (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "User does not exist"})
            }else if(results[0].coin < petFind.cost_coin || results[0].diamond < petFind.cost_diamond){
                res.status(403).json({message : "Not enough funds, do more quests"})
            }else if(results[0].pet_id == data.pet_id){
                res.status(409).json({message : "You currently own this pet"})
            }else{
                model.updateCurrencyCoin({...data, ...{coin : (-petFind.cost_coin)}}, (error, results, fields) => {
                    if(error){
                        res.status(500).json({message : `selectCurrencyById, ${error}`})
                    }
                })
                model.updateCurrencyDiamond({...data, ...{diamond : (-petFind.cost_diamond)}}, (error, results, fields) => {
                    if(error){
                        res.status(500).json({message : `selectCurrencyById, ${error}`})
                    }
                })
                model.updateCurrencyPet(data, callback)
            }
        })

    },
    tradeCurrency : (req, res, next) => {
        const users = {
            user_id1 : res.locals.user_id1,
            user_id2 : res.locals.user_id2,
        }
        const data = {
            coin1 : res.locals.coin1,
            coin2 : res.locals.coin2,
            diamond1 : res.locals.diamond1,
            diamond2 : res.locals.diamond2,
        }
        const callback = (error, results, fields) => {
            if(error && !res.headersSent){
                res.status(500).json({message : `tradeCurrency: ${error}`})
            }
        }
        Object.keys(data).forEach(key => {
            if(data[key] && key.startsWith('coin')){
                if(key.endsWith('1')){
                    model.updateCurrencyCoin({user_id : users.user_id1,coin : (-data.coin1)}, callback)
                }else{
                    model.updateCurrencyCoin({user_id : users.user_id2,coin : (data.coin2)}, callback)
                }
            }else if(data[key]){
                if(key.endsWith('1')){
                    model.updateCurrencyDiamond({user_id : users.user_id1,coin : (-data.diamond1)}, callback)
                }else{
                    model.updateCurrencyDiamond({user_id : users.user_id2,coin : (data.diamond2)}, callback)
                }
            }
        })
        next()
    },
    getTradeCurrency : (req, res, next) => {
        const data = req.params // .requester_id .receiver_id
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `getTradeCurrency: ${error}`})
            }else{
                res.locals.requesterCurrency = results[0]
                res.locals.receiverCurrency = results[1]
                next()
            }
        }
        model.selectTradeCurrency(data, callback)
    }
}