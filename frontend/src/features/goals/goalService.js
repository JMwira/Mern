import axios from "axios";
const API_URL = '/api/goals/'

const createGoal = async(goalData, token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    // console.log(config.Headers)/ 
    return response.data
}

const getGoals = async(token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+'me', config)
    return response.data
}

const goalService = {
    createGoal,
    getGoals
}

export default goalService