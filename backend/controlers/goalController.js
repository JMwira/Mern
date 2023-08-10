const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//@desc Get goals
//@access Private
//@route Get /api/goals
const getGoals = asyncHandler(async(req, res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})


//@desc Get goals
//@access Private
//@route Get /api/goals
const getUserGoals = asyncHandler(async(req, res)=>{
    const owner = await User.findById(req.user.id)

    const goals = await Goal.find({user:owner})
    res.status(200).json(goals)
})


//@desc Set goals
//@access Private
//@route post /api/goals
const setGoals = asyncHandler(async(req, res)=>{
    if(req.body.text){
        const goal = await Goal.create({
            text:req.body.text,
            user:req.user.id
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
    const owner = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)
    if(goal){
        if(!owner){
            res.status(401)
            throw new Error('User does not exist')
        }
        if(goal.user.toString()!==owner.id){
            res.status(401).json("unauthorized user")
        } else{
            const updatdeGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.status(200).json(updatdeGoal)
        }
    }else{
        res.status(400)
        throw new Error("goal not found")
    }
})

//@desc delete goals
//@access Private
//@route delete /api/goals/:id
const deleteGoals = asyncHandler(async(req, res)=>{
    const owner = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id);
    if(goal){
        if(!owner){
            res.status(401)
            throw new Error('User does not exist')
        }
        if(goal.user.toString()!==owner.id){
            res.status(401).json("unauthorized user")
        } else{
            await goal.deleteOne();
            res.status(200).json(`${goal} has been deleted`)
        }
    }else{
        res.status(400)
        throw new Error("goal not found")
    }
})

module.exports = {
    getGoals,
    getUserGoals,
    setGoals,
    editGoals,
    deleteGoals
}