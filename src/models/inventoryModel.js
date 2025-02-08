const pool = require('../services/db')

module.exports = {
    selectInventoryByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Inventory
        WHERE user_id = ?
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    insertInventory : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO Inventory (user_id, loot_id) VALUES
        (?,?)
        `
        const VALUES = [data.user_id, data.loot_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    updateInventoryUser : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE Inventory
        SET user_id = ?
        WHERE inventory_id = ?
        `
        const VALUES = [data.user_id, data.inventory_id]
        
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    deleteSingleInventory : (data, callback) => {
        const SQLSTATEMENT = `
        DELETE FROM Inventory
        WHERE inventory_id = ?
        ;

        ALTER TABLE User AUTO_INCREMENT = 1;
        `
        const VALUES = [data.inventory_id]
        pool.query(SQLSTATEMENT, VALUES, callback)
    },
    selectTradeInventory : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM Inventory
        WHERE user_id = ?
        ;

        SELECT * FROM Inventory
        WHERE user_id = ?
        ;
        `
        const VALUES = [data.requester_id, data.receiver_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    }
}