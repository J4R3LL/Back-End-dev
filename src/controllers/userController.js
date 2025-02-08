const model = require("../models/userModel.js");
const async = require('async')

module.exports = {
    createNewUser : (req, res, next)=>{
        const data = req.body //includes .username and .email

        const callback = (error, results, fields) => {
            if (req.body.username == undefined || req.body.email == undefined) {
                res.status(400).json({message : "username or email missing from body"});
            } else {
                model.selectAllUser((error,results,fields) => {
                    res.status(201).json(results.find(obj => obj.email == req.body.email));
                })
            }
        }

        //check if user exists
        model.selectAllUser((error,results,fields) => {
            const findUser = results.find(obj => obj.email == req.body.email)

            if(findUser == undefined){
                model.insertSingle(data,callback)
            }else{
                res.status(409).json({message: "User already exists"})
            }
        })
        

    },

    getAllUser : (req, res, next) => {

        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json({message :`getAllUser, ${error}`})
            }else{
                res.status(200).json(results)
            }
        }

        model.selectAllUser(callback)
    },

    getUserById : (req, res, next) => {
        const data = req.params // includes .user_id

        const callback = (error, results, fields) => {
            if(data.user_id == undefined){
                res.status(400).json({message : "Missing user id as parameter"})
            }else if(results.length == 0){
                res.status(404).json({message : "User Id not found"})
            }else{
                res.status(200).json(results)
            }
        }

        model.selectUserById(data,callback)
    },

    deleteUserById : (req, res, next) => {
        const data = req.params //includes .user_id

        const callback = (error, results, fields) => {
            if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
            } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
        }

        model.deleteById(data,callback)
    },
    getRandomUsers : (req, res, next) => {
        const callback = (error, results, fields) => {
            if(error){
            res.status(500).json(error)
            }else{
            res.locals.randomUsers = results
            next()
            }
        }

        model.selectRandomUsers(callback)
    },
    login : (req, res, next) => {
        try { 
            const requiredFields = ['username', 'password'];
    
            for (const field of requiredFields) {
                if (req.body[field] === undefined || req.body[field] === "") {
                    res.status(400).json({ message: `${field} is undefined or empty` });
                    return;
                }
            };
    
            const data = {
                username: req.body.username,
                password: res.locals.hash
            };
    
            const callback = (error, results) => {
                if(error){
                    console.error("Error login callback: ", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0){
                        res.status(404).json({message: "Invalid Username or Password"}); 
                    } else {
                        res.locals.userId = results[0].user_id
                        res.locals.hash = results[0].password
                        next();
                    }
                }
            };
    
            model.selectUserByUsername(data, callback);
    
        } catch (error) {
            console.error("Error login: ", error);
            res.status(500).json(error);
        }
    },
    checkUsernameOrEmailExist : (req, res, next) => {
        try {
            const requiredFields = ['username', 'email'];
    
            for (const field of requiredFields) {
                if (req.body[field] === undefined || req.body[field] === "") {
                    res.status(400).json({ message: `${field} is undefined or empty` });
                    return;
                }
            };
        
            const data = {
                email: req.body.email,
                username: req.body.username
            };
    
            const callback = (error, results) => {
                if(error){
                    console.error("Error readUserByEmailAndUsername callback: ", error);
                    res.status(500).json(error);
                } else {
                    if(results[1].length != 0 || results[0].length != 0){
                        res.status(409).json({message: "Username or email already exists"});
                    } else {
                        next();
                    }
                }
            };
    
            model.readUserByEmailAndUsername(data, callback);
    
        } catch (error) {
            console.error("Error readUserByEmailAndUsername: ", error);
            res.status(500).json(error);
        }
    
    },
    register : (req, res, next) => {
        try { 
            const data = {
                email: req.body.email,
                username: req.body.username,
                password: res.locals.hash
            };
    
            const callback = (error, results) => {
                if(error){
                    console.error("Error register callback: ", error);
                    res.status(500).json(error);
                } else {
                    res.locals.userId = results.insertId
                    //res.status(200).json({message: "Registration successful!"}); 
                    next();
                }
            };
    
            model.register(data, callback);
    
        } catch (error) {
            console.error("Error register: ", error);
            res.status(500).json(error);
        }
    },
    getUserByIdMiddleware : (req, res, next) => {
        const data = {
            user_id : req.params.userId
        }

        const callback = (error, results, fields) => {
            if(error){
                res.status(500).json(`getUserByIdMiddleware: ${error}`)
            }else{
                res.locals.username = results[0].username
                res.locals.email = results[0].email
                next()
            }
        }

        model.selectUserById(data,callback)
    },
    sendProfile : (req, res, next) => {
        res.status(200).json({
            username : res.locals.username,
            email : res.locals.email,
            bio : res.locals.bio,
            profile_pic : res.locals.profile_pic,
            currency : res.locals.currency,
            pet : res.locals.petFind,
            inventory : res.locals.inventory,
            lootPool : res.locals.lootPool,
            currency_status : res.locals.currency_status,
            inventory_status : res.locals.inventory_status,
            trades : res.locals.trades
        })
    },
    sendRandomUsers : (req, res, next) => {
        res.status(200).json({
            users : res.locals.randomUsers,
            bio : res.locals.randomBio
        })
    },
    updateUser : (req, res, next) => {
        const data = req.body //includes username email
        const callback = (error, results, fields) => {
            if(data.username == undefined || data.email == undefined){
                res.status(400).json({message : "Missing username or email"})
            }else if(error){
                res.status(500).json({message : `updateUser: ${error}`})
            }else{
                next()
            }
        }

        if(data.user_id != res.locals.userId){
            res.status(403).json({message : "You don't have access to update account"})
        }else{
            model.updateUserByUserId(data, callback)
        }
    },
    checkUsernameAndEmail : (req, res,next) => {
        try {
            const requiredFields = ['username', 'email'];
    
            for (const field of requiredFields) {
                if (req.body[field] === undefined || req.body[field] === "") {
                    res.status(400).json({ message: `${field} is undefined or empty` });
                    return;
                }
            };
        
            const data = {
                email: req.body.email,
                username: req.body.username
            };
    
            const callback = (error, results) => {
                if(error){
                    console.error("Error readUserByEmailAndUsername callback: ", error);
                    res.status(500).json(error);
                } else {
                    if((results[1].length == 1 && results[1][0].user_id == req.body.user_id) && (results[0].length == 1 && results[0][0].user_id == req.body.user_id)){
                        next()
                    }else if(results[1].length != 0 || results[0].length != 0){
                        res.status(409).json({message: "Username or email already exists"});
                    } else {
                        next();
                    }
                }
            };
    
            model.readUserByEmailAndUsername(data, callback);
    
        } catch (error) {
            console.error("Error readUserByEmailAndUsername: ", error);
            res.status(500).json(error);
        }
    
    },
    getUsernameForMessages : (req, res, next) => {
        var tasks = [], userInfo = []
        res.locals.messages.forEach(message => {
            tasks.push((callback) => {
                model.selectUsernameByUserId({user_id:message.user_id}, (error, results, fields) => {
                    if(error && !res.headersSent){
                        res.status(500).json({message : `getUsernameForMessages: ${error}`})
                    }else{
                        userInfo.push(results[0])
                        callback()
                    }
                })
            })
        });
        async.parallel(tasks, ()=>{
            res.locals.userInfo = userInfo
            next()
        })
    },
    endRegister : (req, res, next) => {
        res.status(200).send({message : "Account Creation successful"})
    },
    getUserBySimilarUsername : (req, res, next) => {
        const data = req.params //.username
        const callback = (error, results, fields) => {
            if(results.length == 0){
                res.status(404).json({message : "No user with similar username"})
            }else if(error){
                res.status(500).json({message : `getUserBySimilarUsername: ${error}`})
            }else{
                res.status(200).json({users : results})
            }
        }
        model.selectUserBySimilarUsername(data, callback)
    }
}