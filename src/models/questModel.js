const pool = require('../services/db')

module.exports = {
    selectQuestById : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Quest
        WHERE quest_id = ?
        `
        const VALUES = [data.quest_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSingleQuest : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Quest (title, description, tier) VALUES
        (?,?,?)
        `
        const VALUES = [data.title, data.description, data.tier]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateQuest : (data, callback) => {
        const SQLSTATEMENT =`
        UPDATE Quest
        SET title = ?, description = ?, tier = ?,
        WHERE quest_id = ?
        `
        const VALUES = [data.title, data.description, data.tier, data.quest_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectAllQuest : (callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Quest
        `
        pool.query(SQLSTATEMENT,callback)
    },
    deleteQuest : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM Quest
        WHERE quest_id = ?;

        ALTER TABLE Quest AUTO_INCREMENT = 1;
        `
        const VALUES = [data.quest_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectQuestBySimilarTitle : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Quest
        WHERE title LIKE ?
        ;
        `
        const VALUES = [`${data.title}%`]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}