import React, { useReducer, useState } from 'react'
import "./signup.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../components/axiosInstance';


const reducer = (state, action) => {
    switch (action.type) {
        case "EMAIL":
            return{...state, email: action.payload}
        case "PASSWORD":
            return{...state, password: action.payload}
        case "CONFIRMPASSWORD":
            return{...state, confirmPassword: action.payload}
        default:
            return state
    }
}

const Signup = () => {

    const [message, setMessage] = useState({text: "", type: ""})
    const [loading, setLoading] = useState(false)


    const [state, dispatch] = useReducer(reducer, {
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const navigate = useNavigate()

    const validateForm = () => {
        if (!state.email || !state.password || !state.confirmPassword){
            setMessage({ text: "Please fill all the required fields", type: "error"})
            return false
        }
        if (state.password !== state.confirmPassword) {
            setMessage({ text: "Passwords do not match!", type: "error"})
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validateForm())return
        setLoading(true)
      

        try {
            const res = await api.post("/signup", {
              email: state.email,
              password: state.password
            })
            if(res.data.success) {
                setMessage({text: res.data.message, type: "success"})
                setTimeout(() => navigate("/login"), 2000)
            }   else {
                setMessage({text: res.data.message, type: "error"})
            }
        } catch (error) {
            if (error.response && error.response.data?.message){
                setMessage({text: error.response.data.message, type: "error"})
            }   else {
                setMessage({text: "Network error. Please try again", type: "error"})
            }
        }   finally {
            setLoading(false)
        }
    }
  return (
    <div className='signup_container'>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={(e) => {dispatch({type: "EMAIL", payload: e.target.value})}} placeholder='Email' required/>
        <label>Password</label>
        <div className="password_field">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      dispatch({ type: "PASSWORD", payload: e.target.value })
                    }
                    placeholder="Password"
                    required
                  />
                  <span
                    className="toggle_eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
        </div>
        <label>Confirm Password</label>
        <div className="password_field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) =>
                      dispatch({ type: "CONFIRMPASSWORD", payload: e.target.value })
                    }
                    placeholder="Confirm Password"
                    required
                  />
                  <span
                    className="toggle_eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
        </div>
        {message.text && (
            <p className={`form_message ${message.type}`}>
                {message.text}
            </p>
        )}
        <button type='submit' disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
      <div className='login_redirect'>
        <p>Already have an account <span><NavLink to="/login">Login</NavLink></span></p>
      </div>
    </div>
  )
}

export default Signup
