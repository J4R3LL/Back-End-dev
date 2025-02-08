const pool = require('../services/db')

module.exports = {
    selectPetsById : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Pets
        WHERE pet_id = ?
        `
        const VALUES = [data.pet_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertSinglePets : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Pets (name, hp, dmg, dmg_offset, cost_coin, cost_diamond) VALUES
        (?,?,?,?,?,?)
        `
        const VALUES = [data.name, data.hp, data.dmg, data.dmg_offset, data.cost_coin, data.cost_diamond]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updatePets : (data, callback) => {
            const SQLSTATEMENT =`
            UPDATE Pets
            SET name = ?, hp = ?, dmg = ?, dmg_offset = ?, cost_coin = ?, cost_diamond = ?
            WHERE pet_id = ?
            `
        const VALUES = [data.name, data.hp, data.dmg, data.dmg_offset, data.cost_coin, data.cost_diamond, data.pet_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectAllPets : (callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Pets
        `
        pool.query(SQLSTATEMENT,callback)
    },
    deletePets : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM Pets
        WHERE pet_id = ?;

        ALTER TABLE Pets AUTO_INCREMENT = 1;
        `
        const VALUES = [data.pet_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectPetBySimilarName : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM PETS
        WHERE name LIKE ?
        `
        const VALUES = [`${data.name}%`]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}