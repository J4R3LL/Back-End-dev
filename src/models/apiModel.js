const pool = require('../services/db')

module.exports = {
    insertSingleApi : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Api (user_id, currency_status, inventory_status) VALUES
        (?, false, false);
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    getApiByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Api
        WHERE user_id = ?
        ;
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateApiByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE Api
        SET currency_status = ?, inventory_status = ?
        WHERE user_id = ?
        `
        const VALUES = [data.currency_status, data.inventory_status, data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}