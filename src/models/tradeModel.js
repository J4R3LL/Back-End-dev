const pool = require('../services/db')

module.exports = {
    selectTradeByBothUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Trade
        WHERE user_id1 = ?
        ;

        SELECT * FROM Trade
        WHERE user_id2 = ?
        ;
        `
        const VALUES = [data.user_id1, data.user_id2]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectBothInventoryAndCurrency : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Currency
        WHERE user_id = ? OR user_id = ?
        ;

        SELECT * FROM Inventory
        WHERE user_id = ?
        ;

        SELECT * FROM Inventory
        WHERE user_id = ?
        ;
        `
        const VALUES = [data.user_id1, data.user_id2, data.user_id1, data.user_id2]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    deleteTradeById : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM Trade
        WHERE trade_id = ?
        `
        const VALUES = [data.trade_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSingleTrade : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Trade (user_id1, user_id2, coin1, coin2, diamond1, diamond2, inventory_id1, inventory_id2)
        VALUES (?,?,?,?,?,?,?,?)
        ;
        `
        const VALUES = [data.user_id1, data.user_id2, data.coin1, data.coin2, data.diamond1, data.diamond2, data.inventory_id1, data.inventory_id2]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectTradeByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Trade
        WHERE user_id2 = ?
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectTradeByTradeId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Trade
        WHERE trade_id = ?
        ;
        `
        const VALUES = [data.trade_id]
        pool.query(SQLSTATEMENT, VALUES, callback)
    }
}