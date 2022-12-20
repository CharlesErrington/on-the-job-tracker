const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/companySignup', authController.getCompanySignup)
router.post('/companySignup', authController.postCompanySignup)
router.get('/companies', homeController.getCompanies)
router.post('/getPostcodeArrivalTime', homeController.getPostcodeArrivalTime)

module.exports = router