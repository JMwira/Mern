import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import GoalForm from '../components/GoalForm';
import { getGoals, reset } from '../features/goals/goalSlice';
import {FiDelete} from "react-icons/fi"

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  const {goals, isError, message} = useSelector((state)=>state.goals)
  

  
  useEffect(()=>{
    if(!user) {
      navigate('/login')
    }else{
      dispatch(getGoals())
    }
    return()=>{
      dispatch(reset())
    }
  },[user,navigate, dispatch, message, isError])
  return (
    <div>
      <section className="heading">
        <h1>
          Welcome {user&&user.name}
        </h1>
        <p>Goals dashboard</p>
      </section>
      <GoalForm/>
      <section className='content'>
        <div className="goals">
          {
            goals.map((item)=>(
                <section className="form-group" key={Math.random()} >
                  <div style={{display:'inline-block'}} >
                    <p style={{float:'left'}} >{item.text}</p>
                    <FiDelete/>
                  </div>
                </section>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Dashboard
