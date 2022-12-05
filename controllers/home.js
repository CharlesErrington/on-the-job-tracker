const Company = require('../models/Company')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
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
}