const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes')
const task_progressRoutes = require('./taskProgressRoutes')
const quest = require('./questRoutes')
const lootPool = require('./lootPoolRoutes')
const pets = require('./petsRoutes')
const currency = require('./currencyRoutes')
const inventory = require('./inventoryRoutes')
const battle = require('./battleRoutes')
const trading = require('./tradingRoutes')
const api = require('./apiRoutes')
const message = require('./messageRoutes');
const bio = require('./bioRoutes')

const userController = require('../controllers/userController')
const bioController = require('../controllers/bioController')
const apiController = require('../controllers/apiController')
const currencyController = require('../controllers/currencyController')
const bcryptMiddleware = require('../middlewares/bcryptMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')


router.use("/users", userRoutes)
router.use("/task_progress", task_progressRoutes)

router.use("/quest", quest)
router.use("/lootPool", lootPool)
router.use('/pets', pets)
router.use('/currency', currency)
router.use('/inventory', inventory)
router.use('/battle', battle)
router.use('/trading', trading)
router.use('/apiSettings', api)
router.use("/message", message);
router.use("/bio", bio)

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword,
                        userController.register, bioController.createBioByUserId, apiController.createSingleApi, currencyController.createSingleCurrency, userController.endRegister);
router.get("/verifyToken", jwtMiddleware.verifyToken, jwtMiddleware.sendToken)

module.exports = router;
