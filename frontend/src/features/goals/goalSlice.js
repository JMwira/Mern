import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import goalService from "./goalService"

const initialState = {
    goals:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const createGoal = createAsyncThunk(('goals/create'),async(goalData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch(err){
        const message = (err.response&&err.response.data&&err.response.data.message)||err.message || err.toString()
        return thunkAPI.rejectWithMessage(message)
    }
})
export const getGoals = createAsyncThunk(('goals/getall'),async(goalData,thunkAPI)=>{
    try{
        const token = await thunkAPI.getState().auth.user.token
        // console.log(token)
        return await goalService.getGoals(token)
    } catch(err){
        const message = (err.response&&err.response.data&&err.response.data.message)||err.message || err.toString()
        return thunkAPI.rejectWithMessage(message)
        // console.log(err.message)
    }
})

// export const getGoals = createAsyncThunk(('goals/getAll'), async(thunkAPI)=>{
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         console.log(token)
//         // return await goalService.getGoals(token)
//     } catch(err){
//         console.log(err.message)
//         // const message = (err.response&&err.response.data&&err.response.data.message)||err.message || err.toString()
//         // return thunkAPI.rejectWithMessage(message)
//     }
// })

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createGoal.pending , (state)=>{
            state.isLoading=true
        })
        .addCase(createGoal.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getGoals.pending , (state)=>{
            state.isLoading=true
        })
        .addCase(getGoals.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.goals=action.payload
        })
        .addCase(getGoals.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer