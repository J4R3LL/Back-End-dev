const pool = require('../services/db')

module.exports = {
    insertsingleBattle : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO BattleLog (attacker_id, defender_id, status) VALUES
        (?, ?, ?);
        `
        const VALUES = [data.attacker_id, data.defender_id, data.status]
        pool.query(SQLSTATEMENT, VALUES, callback)
    }
}