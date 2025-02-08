const pool = require('../services/db')

module.exports = {
    insertSingle : (data, callback)=>{
        const SQLSTATEMENT = `
        INSERT INTO User (username, email) VALUES
        (?,?);

        INSERT INTO Currency (user_id, pet_id, coin, diamond) VALUES
        (LAST_INSERT_ID(),NULL,0,0);
        `

        const VALUES = [data.username, data.email]

        pool.query(SQLSTATEMENT, VALUES, callback)
    },

    selectAllUser : (callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM User
        `
        pool.query(SQLSTATEMENT,callback)
    },

    selectUserById : (data, callback) => {
        const SQLSTATEMENT =`
        SELECT * FROM User
        WHERE user_id = ?
        `
        const VALUES = [data.user_id]

        pool.query(SQLSTATEMENT,VALUES,callback)
    },

    deleteById : (data, callback) =>
    {
        const SQLSTATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;
        
        DELETE FROM Currency
        WHERE user_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
        `;
        //^ this line auto reset auto increment
        const VALUES = [data.user_id, data.user_id];
    
        pool.query(SQLSTATEMENT, VALUES, callback);
    
    },
    selectRandomUsers : (callback) => {
        const SQLSTATEMENT =`
        SELECT * FROM User
        ORDER BY RAND()
        LIMIT 12;
        `

        pool.query(SQLSTATEMENT,callback)
    },
    selectUserByUsername : (data, callback) => {

        const SQLSTATEMENT = `
            SELECT *
            FROM User
            WHERE username = ?;
        `;
    
        VALUES = [data.username];
    
        pool.query(SQLSTATEMENT, VALUES, callback);
    },
    readUserByEmailAndUsername : (data, callback) => {

        const SQLSTATEMENT = `
            SELECT User.email, User.user_id
            FROM User
            WHERE email = ?;
    
            SELECT User.username, User.user_id
            FROM User
            WHERE username = ?;
        `;
    
        VALUES = [data.email, data.username];
    
        pool.query(SQLSTATEMENT, VALUES, callback);
    },
    register : (data, callback) => {

        const SQLSTATEMENT = `
            INSERT INTO User (username, email, password)
            VALUES (?, ?, ?);
        `;
    
        VALUES = [data.username, data.email, data.password];
    
        pool.query(SQLSTATEMENT, VALUES, callback);
    },
    updateUserByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?
        `
        const VALUES = [data.username, data.email, data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectUsernameByUserId : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT User.user_id, User.username FROM User
        WHERE user_id = ?
        ;
        `
        const VALUES = [data.user_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectUserBySimilarUsername : (data, callback) => {

        const SQLSTATEMENT = `
            SELECT *
            FROM User
            WHERE username like ?;
        `;
    
        VALUES = [`${data.username}%`];
    
        pool.query(SQLSTATEMENT, VALUES, callback);
    }
}

