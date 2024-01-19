import React from 'react'
import { useState } from 'react';
import Notify from '../components/Notify';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const notify = (message) => {    
        setErrorMessage(message)    
        setTimeout(() => {      
          setErrorMessage(null)    
        }, 10000)  
      }

    if (!token) {
        return (

            <div>
            <Notify errorMessage={errorMessage} />
            <h2>Login</h2>
            <LoginForm
                setToken={setToken}
                setError={notify}
            />
            </div>
        )
    }
}

export default Login