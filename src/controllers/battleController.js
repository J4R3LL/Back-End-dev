const model = require('../models/battleModel')

module.exports = {
    createSingleBattle : (req, res, next) => {
        const data = res.locals.outcome

        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message : `createSingleBattle: ${error}${data.message}`})
            }else{
                res.status(200).json({message : data.message})
            }
        }
        
        model.insertsingleBattle(data, callback)
    }
}