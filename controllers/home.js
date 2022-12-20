const Company = require('../models/Company')
const ArrivalTimes = require('../models/ArrivalTimes')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', { arrivalTime: '' })
    },
    getCompanies: async (req,res)=>{
    
        try{
            const companiesList = await Company.find({})
            console.log(companiesList[0].companyName)
            res.render('companies.ejs', {companies: companiesList})
        }catch(err){
            console.log(err)
        }
    },
    getPostcodeArrivalTime: async (req,res) => {

        console.log(req.body.postcodeForArrivalTime)
        
       

        // Get the input from the form
        const postcode = req.body.postcodeForArrivalTime;

        const queryObject = {}
        queryObject[`postcodeArrivalTimes.${postcode}`] = {$exists: true}
        try {
            let arrivalTimesFromSearch = await ArrivalTimes.findOne(queryObject).sort({ $natural: -1 });
            if (arrivalTimesFromSearch) {
                console.log('arrivalTimesFromSearch   ', arrivalTimesFromSearch.postcodeArrivalTimes[postcode])
                const customerArrivalTime = arrivalTimesFromSearch.postcodeArrivalTimes[postcode]
                res.render('index.ejs', {arrivalTime: customerArrivalTime})
            } else {
                res.render('index.ejs', { arrivalTime: 'Not available' });
            }
            
        }catch(err){
            console.log(err)
        }
        
        
  }
}
    // getJobs: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const jobItems = await Job.find({company:req.user.company}).sort({ order: 1 });
    //         console.log('these are the job items ', jobItems)
    //         let date = new Date()
    //         let dateString = date.toISOString().slice(0, 10)
    //         console.log(req.user.id)
    //         console.log(dateString)
    //         const startTime = await StartTime.findOne({workerId: req.user.id, date: dateString})
    //         console.log('starttime:' + startTime)
    //         const finishTime = await FinishTime.findOne({workerId: req.user.id, date: dateString})
    //         console.log('finishTime: ', finishTime)
    //         const startLocation = await StartLocation.findOne({workerId: req.user.id, date: dateString})
            
    //         res.render('jobs.ejs', {jobs: jobItems, user: req.user, startTime: startTime, startLocation: startLocation, finishTime: finishTime})

    //     }catch(err){
    //         console.log(err)
    //     }
    // },

