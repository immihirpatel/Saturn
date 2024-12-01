import React, { useState } from 'react'
import "C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Login.css";
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const { showAlert } = props
    const [Action, setAction] = useState("Login");
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [credSignup, setCredsignup] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = credSignup
        console.log(name)
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            setAction("Login")
            setCredsignup({ name: "", email: "", password: "", cpassword: "" });
            props.showAlert("Account Created Successfully!", "success")
        }
        else {
            props.showAlert("Oops! Something went wrong", "danger")
        }
    }

    const onSignupchange = (e) => {
        setCredsignup({ ...credSignup, [e.target.name]: e.target.value })
    }


    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //const token = {token:json.authtoken}
            localStorage.setItem("token",json.authtoken);
            history('/')
            props.showAlert("Loggedin Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container-login'>
            <div className='header-login'>
                <div className='text-login'>{Action}</div>
                <div className='underline-login'></div>
            </div >
            <div className='inputs-login'>
                {Action === "Login" ? <div></div> : <div className='input-login'>
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder='Name' name="name" id="name" value={credSignup.name} onChange={onSignupchange} required />
                </div>}
                {Action === "Login" ?
                    <div className='input-login'>
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email' name="email" id="email"value={credentials.email}  onChange={onchange}  required />
                    </div> : <div className='input-login'>
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder='Email' name="email" id="email" value={credSignup.email} onChange={onSignupchange} required />
                    </div>}
                {Action === "Login" ?
                    <div className='input-login'>
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' onChange={onchange} name="password" value={credentials.password} id="password" required />
                    </div> : <div className='input-login'>
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Password' value={credSignup.password} onChange={onSignupchange} name="password" id="password" required />
                    </div>}
                {Action === "Login" ? <div></div> : <div className='input-login'>
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Confirm Password'value={credSignup.cpassword} onChange={onSignupchange} name="cpassword" id="cpassword" required />
                </div>}

            </div>
            {Action === "Login" ? <div className='forgot-password'>
                Lost Password?<span>Click Here!</span>
            </div> : <div></div>}

            <div className='submit-container'>
                {Action === "Login" ? (
                    <form onSubmit={handlesubmit}>
                        <button type="submit" className="submit-login">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <button type="submit" className="submit-login">Sign Up</button>
                    </form>
                )}
            </div>
            <div className='switch-container'>
                <button className="switch-action"
                    onClick={() => setAction(Action === "Login" ? "Sign Up" : "Login")}>
                    {Action === "Login" ? "Don't have an account? Signup" : "Already a user? Login"}
                </button>
            </div>
        </div>
    )

}
export default Login
