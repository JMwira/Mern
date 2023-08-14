import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {register, reset} from "../features/auth/authSlice"
import { FaUser } from 'react-icons/fa'

function Register() {
    const [FormData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        passsword2:""
    })
    const {name, email, password, passsword2} = FormData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>
        state.auth
    )

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess||user){
            navigate('/')
        }
        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const userData = {
            name, email, password
        }
        dispatch(register(userData))
    }
  return (
    <>
      <section className="heading">
        <h1>
            <FaUser/> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id="name" name='name' value={name} placeholder='Enter your name' onChange={onChange} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="email" name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="password" name='password' value={password} placeholder='Enter your password' onChange={onChange} />
            </div>
            <div className="form-group">
                <input type="password " className="form-control" id="password" name='password' value={password} placeholder='confirm your password' onChange={onChange} />
            </div>
            <div className="form-group">
                <button type="submit" className='btn btn-block' >Submit</button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Register
