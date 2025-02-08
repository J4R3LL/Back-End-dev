const pool = require('../services/db')

module.exports = {
    selectBioByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Bio
        WHERE user_id = ?
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSingleBio : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Bio (user_id) VALUES
        (?)
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)

    },
    deleteSingleBio : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM Bio
        WHERE user_id = ?;

        ALTER TABLE Bio AUTO_INCREMENT = 1;
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}