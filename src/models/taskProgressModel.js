const pool = require('../services/db')

module.exports = {
    insertSingleTaskProgress : (data, callback) => {
        const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?,?,?,?)
        `
        const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },

    selectAllTaskProgress : (callback) => {
        const SQLSTATEMENT =`
        SELECT * FROM TaskProgress
        `
        pool.query(SQLSTATEMENT,callback)
    },

    selectTaskProgressById : (data, callback) => {
        const SQLSTATEMENT =`
        SELECT * FROM TaskProgress
        WHERE progress_id = ?
        `
        const VALUES = [data.progress_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },

    updateTaskProgress : (data, callback) => {
        const SQLSTATEMENT =`
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?
        `
        const VALUES = [data.notes, data.progress_id,]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },

    deleteTaskProgress : (data, callback) => {
        const SQLSTATEMENT =`
        DELETE FROM TaskProgress
        WHERE progress_id = ?
        `
        const VALUES = [data.progress_id]
        pool.query(SQLSTATEMENT,VALUES,callback)
    },
    selectTaskProgressByUserIdTaskIdAndDate : (data, callback) => {
        const SQLSTATEMENT = `
        SELECT * FROM TaskProgress
        WHERE user_id = ? AND task_id = ? AND completion_date = ?
        ;
        `
        const VALUES = [data.user_id, data.quest_id, data.completion_date]
        pool.query(SQLSTATEMENT, VALUES, callback)
    }
}