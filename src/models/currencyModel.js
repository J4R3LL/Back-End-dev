const pool = require('../services/db')

module.exports = {
    selectCurrencyById : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Currency 
        WHERE user_id = ?
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT, VALUES, callback)
    },
    updateCurrencyCoin : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE Currency
        SET coin = coin + ?
        WHERE user_id = ?
        `
        const VALUES = [data.coin, data.user_id]
        
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateCurrencyDiamond : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE Currency
        SET diamond = diamond + ?
        WHERE user_id = ?
        `
        const VALUES = [data.diamond, data.user_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateCurrencyPet : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE Currency
        SET pet_id = ?
        WHERE user_id = ?
        `
        const VALUES = [data.pet_id, data.user_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSingleCurrency : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Currency (user_id, coin, diamond) VALUES
        (?,0,0)
        ;
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectTradeCurrency : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Currency
        WHERE user_id = ?
        ;

        SELECT * FROM Currency
        WHERE user_id = ?
        ;
        `
        const VALUES = [data.requester_id, data.receiver_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}