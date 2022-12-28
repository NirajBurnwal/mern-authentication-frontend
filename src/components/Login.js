import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './mix.css'

const Login = () => {
    // @ show/hide state
    const [passShow, setPassShow] = useState(false)

    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })

    const history = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target

        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    }

    const logInUser = async (e) => {
        e.preventDefault()
        const { email, password } = inputValue

        if (email === "") {
            alert("Please enter your email")
        } else if (password === "") {
            alert("Please enter password")
        } else {
            // console.log("login successful");
            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const res = await data.json()

            // console.log(res);

            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token)
                history("/dash")
                setInputValue({ ...inputValue, email: "", password: "" })
            } else {
                alert("Invalid credentials")
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi! we are glad, you are back. Please Login</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={inputValue.email} onChange={inputHandler} placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                {/* show/hide toggle option */}
                                <input type={!passShow ? "password" : "text"} value={inputValue.password} onChange={inputHandler} name='password' id='password' placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={logInUser} >Login</button>
                        <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login