import React from 'react';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import LoginForm from '../components/LoginForm';
import Notify from '../components/Notify';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const [token, setToken] = useState(localStorage.getItem('library-user-token'));
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()
    
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 10000)
      }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
      }

      if (!token) {
        return (
          <>
            <LoginForm setToken={setToken} setError={notify} />
          </>
        )
      }
    
    return (
      <div>
        <div>
            <Notify errorMessage={errorMessage} />
            <h1>Welcome to Author Central</h1>
            <p>Discover and connect with your favorite authors.</p>
            <button onClick={logout}>logout</button>
        </div>

      </div>
    );
};

export default Home;
