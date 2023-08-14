import React,{useEffect} from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import {Logout, reset} from "../features/auth/authSlice"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>
        state.auth
    )
    const onLogout = ()=>{
        dispatch(Logout())
        dispatch(reset())
        navigate('/register')
    }
  return (
    <header className='header' >
      <div className="logo">
        <Link to='/' >{
            user?(<>
            welcome back {user.name}
            </>):(<>
            Goal setter
            </>)
        }</Link>
      </div>
      <ul>
        {
            user?(<>                
                <li>
                    <button className='btn' onClick={onLogout} >
                        <FaSignInAlt/> Logout
                    </button>
                </li>
            </>):(
            <>
                <li>
                    <Link to='/login' >
                        <FaSignInAlt/> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register' >
                        <FaUser/> Register
                    </Link>
                </li>
            </>
            )
        }
        
      </ul>
    </header>
  )
}

export default Header
