const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobs') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, jobsController.getJobs)

router.post('/createJob', jobsController.createJob)

router.put('/markComplete', jobsController.markComplete)

router.put('/markIncomplete', jobsController.markIncomplete)

router.delete('/deleteJob', jobsController.deleteJob)

router.delete('/deleteStartTime', jobsController.deleteStartTime)

router.delete('/deleteStartLocation', jobsController.deleteStartLocation)

router.post('/startTime', jobsController.addStartTime)

router.post('/addStartLocation', jobsController.addStartLocation)

router.post('/finishTime', jobsController.addFinishTime)

router.delete('/deleteFinishTime', jobsController.deleteFinishTime)

router.put('/changeJobOrderUp', jobsController.changeJobOrderUp)

router.put('/changeJobOrderDown', jobsController.changeJobOrderDown)

router.post('/addArrivalTimes', jobsController.addArrivalTimes)

module.exports = router