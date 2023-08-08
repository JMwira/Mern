const asyncHandler = require('express-async-handler')

//@desc Get goals
//@access Private
//@route Get /api/goals
const getGoals = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message:"get goals"
    })
})


//@desc Set goals
//@access Private
//@route post /api/goals
const setGoals = asyncHandler(async(req, res)=>{
    if(req.body.text){
        res.status(200).json(
            req.body
        )
    } else{
        res.status(400)
        throw new Error("cannot post an empty form")
    }
})

//@desc edit goals
//@access Private
//@route put /api/goals/:id
const editGoals = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message:req.params.id,
        text:"edited"
    })
})

//@desc delete goals
//@access Private
//@route delete /api/goals/:id
const deleteGoals = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message:req.params.id,
        text:"deleted"
    })
})

module.exports = {
    getGoals,
    setGoals,
    editGoals,
    deleteGoals
}