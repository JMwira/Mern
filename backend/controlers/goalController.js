const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')

//@desc Get goals
//@access Private
//@route Get /api/goals
const getGoals = asyncHandler(async(req, res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})


//@desc Set goals
//@access Private
//@route post /api/goals
const setGoals = asyncHandler(async(req, res)=>{
    if(req.body.text){
        const goal = await Goal.create({
            text:req.body.text
        })
        res.status(200).json(
            goal
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
    const goal = await Goal.findById(req.params.id)
    if(goal){
        const updatdeGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatdeGoal)
    }else{
        res.status(400)
        throw new Error("goal not found")
    }
})

//@desc delete goals
//@access Private
//@route delete /api/goals/:id
const deleteGoals = asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id);
    if(goal){
        await goal.deleteOne();
        res.status(200).json(`${goal} has been deleted`)
    }else{
        res.status(400)
        throw new Error("goal not found")
    }
})

module.exports = {
    getGoals,
    setGoals,
    editGoals,
    deleteGoals
}