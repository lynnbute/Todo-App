import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Register.css";

const Register = () => {
    const initial = {
        Name: '',
        email: '',
        phone_number: '',
        password: ''
    };
    const [data, setData] = useState(initial);
    const [error, setError] = useState(null);
    const { name,  
            email, 
            phone_number,
            password,
        gender } = data;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in data) {
            if (data[key] === "") {
                setError(`${key} is required`);
                return;
            } else {
                formData.append(key, data[key]);
            }
        }
        setError(null);
        // process the form
    };

    return (
        <div className='register-container'>
            <div className='register'>
                <form onSubmit={handleSubmit}>
                    <h1>Registration Form</h1>
                    {error && <p>{error}</p>}
                    <label>Name</label>
                    <input 
                        type='text' 
                        value={name}
                        placeholder='Name'
                        onChange={handleInputChange}
                        name='name' />
                    <label>Email</label>
                    <input 
                        type='email'
                        value={email} 
                        placeholder='Email'
                        onChange={handleInputChange}
                        name='email' />
                    <label>Phone Number</label>
                    <input 
                        type='tel'
                        value={phone_number} 
                        placeholder='+256  Phone Number'
                        onChange={handleInputChange}
                        name='phone_number' />
                        <label>Password</label>
                        <input 
                        type='password'
                        value={password} 
                        placeholder=''
                        onChange={handleInputChange}
                        name='password' />
                        
                    
                        
                    <div className="links">
                        <Link>Already have an account?</Link>
                        <Link to="/">Login</Link>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
