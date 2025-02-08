const pool = require('../services/db')

module.exports = {
    selectLootById : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM LootPool
        WHERE loot_id = ?
        `
        const VALUES = [data.loot_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSingleLoot : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO LootPool (name, rarity) VALUES
        (?,?)
        `
        const VALUES = [data.name, data.rarity]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateLoot : (data, callback) => {
        const SQLSTATEMENT =`
        UPDATE LootPool
        SET name = ?, rarity = ?,
        WHERE loot_id = ?
        `
        const VALUES = [data.name, data.rarity,data.loot_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectAllLoot : (callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM LootPool
        `
        pool.query(SQLSTATEMENT,callback)
    },
    deleteLoot : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM LootPool
        WHERE loot_id = ?;

        ALTER TABLE LootPool AUTO_INCREMENT = 1;
        `
        const VALUES = [data.loot_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    getLootByRarity : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM LootPool
        WHERE rarity = ?;
        `
        const VALUES = [data.rarity]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectLootBySimilarName : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM LootPool
        WHERE name LIKE ?
        `
        const VALUES = [`${data.name}%`]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}