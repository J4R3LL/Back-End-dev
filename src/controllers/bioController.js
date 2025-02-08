const model = require('../models/bioModel')
const async = require('async')

module.exports = {
    getBioByUserId : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json(`getBioByUserId: ${error}`)
            }else{
                res.locals.bio = results[0].bio
                res.locals.profile_pic = results[0].profile_pic
                next()
            }
        }
        
        model.selectBioByUserId(data, callback)
    },
    createBioByUserId : (req, res,next) => {
        const data = {
            user_id : res.locals.userId
        }
        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json(`createBioByUserId: ${error}`)
            }else{
                next()
            }
        }

        model.insertSingleBio(data, callback)
    },
    getRandomBioByUserId : (req, res, next) => {
        const data = res.locals.randomUsers //list of 12 random users
        var tasks = []
        var randomBio = []
        data.forEach(user => {
        tasks.push((callback) => {
            const callback1 = (error, results, fields) => {
                if(error){
                    res.status(500).json({message : `get12BioByUserId: ${error}`})
                }else{
                    randomBio.push(results[0])
                    callback()
                }
            }


                model.selectBioByUserId({user_id : user.user_id}, callback1)
            })
        })


        async.parallel(tasks,(callback) => {
        if(!res.headersSent){
            res.locals.randomBio = randomBio
            next()
        }
        })

    },
    getBioForMessages : (req, res, next) => {
        var bioList = [],tasks=[]
        res.locals.messages.forEach(message => {
            tasks.push((callback) => {
            model.selectBioByUserId({user_id : message.user_id}, (error, results, fields) => {
                if(error && !res.headersSent){
                    res.status(500).json({message : `getBioForMessages: ${error}`})
                }else{
                    bioList.push(results[0])
                    callback()
                }
            })
            })
        })
        async.parallel(tasks,()=>{
            res.locals.bioList = bioList
            next()
        })
    },
    sendSingleBio : (req, res, next) => {
        res.status(200).json({
            bio : res.locals.bio,
            profile_pic : res.locals.profile_pic
        })
    }
}