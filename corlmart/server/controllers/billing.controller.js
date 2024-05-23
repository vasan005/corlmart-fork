import Billing from "../models/billing.model.js"
export const createBilling = async(req, res)=>{
    const findBilling = await Billing.findOne({userId : req?.body?.userId})
    if(findBilling) return res.json({status:406, message:"already have a billing address"})
    const createBilling = await Billing.create(req?.body)
    if(createBilling){
        return res.json({status:200, message:createBilling})
    }else{
        return res.json({status:406, message:"create billing failed"})
    }
}

export const getBilling = async (req, res)=>{
    const getBilling = await Billing.find({userId : req?.query?.userId})
    if(!getBilling) return res.json({status:406, message:"invailf userId"})
        return res.json({status:200, message:getBilling})
}