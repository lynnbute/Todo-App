import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "../css/Login.css"

const Login = () => {
    const initial = {
        username: '',
        password: ''
    }
    const [data, setData] = useState(initial)
    const [error, setError] = useState(null)
    const {username, password} = data

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setData(prev =>({...prev, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        for(let key in data){
            if(data[key] === ""){
                setError(`${key} is required`)
                return
            }else{
                formData.append(key, data[key])
            }
        }
        setError(null)
        //process the form
    }
    return (
        <div className='authForm'>
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                {error && <p>{error}</p>}
                <label>Username</label>
                <input 
                    type='text' 
                    value={username}
                    placeholder='username'
                    onChange={handleInputChange}
                    name='username' />
                <label>Password</label>
                <input 
                    type='password'
                    value={password} 
                    placeholder='password'
                    onChange={handleInputChange}
                    name='password' />
                <div>
                    <Link to ='/register'>Create Account</Link>
                    <Link to ='/password_reset'>Forgot Password ?</Link>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login