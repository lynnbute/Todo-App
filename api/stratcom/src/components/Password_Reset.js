import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "../css/Password.css"

const Password_Reset = () => {
    const initial = {
        phone_number: '',
        email: ''
    }
    const [data, setData] = useState(initial)
    const [error, setError] = useState(null)
    const {phone_number, email} = data

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
        <div className='password-container'>
            <div className='reset'>
            <form onSubmit={handleSubmit}>
                <h1>Password Reset</h1>
                {error && <p>{error}</p>}
                <label>Phone Number</label>
                <input
                    type='tel'
                    value={phone_number}
                    placeholder='+256  Phone Number'
                    onChange={handleInputChange}
                    name='phone_number' />
                <label>Email</label>
                <input
                    type='email'
                    value={email}
                    placeholder='Email'
                    onChange={handleInputChange}
                    name='email' />
                <div>
                    <Link to='/register'>Change Password</Link>
                </div>
                <button> Reset Password</button>
            </form>
        </div>
        </div>
            
    )
}

export default Password_Reset