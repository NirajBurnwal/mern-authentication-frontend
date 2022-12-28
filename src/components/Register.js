import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const Register = () => {
    const [passShow, setPassShow] = useState(false)
    const [cpassShow, setCPassShow] = useState(false)

    const [inputValue, setInputValue] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target

        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    }

    const addUserData = async (e) => {
        e.preventDefault()
        const { fname, email, password, cpassword } = inputValue

        if (fname === "") {
            alert("Please enter your name")
        } else if (email === "") {
            alert("Please enter your email")
        } else if (!email.includes("@")) {
            alert("Please enter valid email")
        } else if (password === "") {
            alert("Please enter password")
        } else if (password.length < 6) {
            alert("password must include 6 characters")
        } else if (cpassword === "") {
            alert("Please enter confirm password")
        } else if (password !== cpassword) {
            alert("password and confirm password do not match")
        } else {
            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });
            const res = await data.json()
            console.log(res.status);
            if (res.status === 201) {
                alert("User Registered successfully")
                setInputValue({ ...inputValue, fname: "", email: "", password: "", cpassword: "" })

            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name='fname' id='fname' value={inputValue.fname} placeholder='Enter Your Name' onChange={inputHandler} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={inputValue.email} placeholder='Enter Your Email Address' onChange={inputHandler} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inputValue.password} name='password' id='password' placeholder='Enter Your Password' onChange={inputHandler} />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inputValue.cpassword} name='cpassword' id='cpassword' placeholder='Confirm Password' onChange={inputHandler} />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserData} >Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register