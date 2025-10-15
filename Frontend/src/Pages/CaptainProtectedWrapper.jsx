import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainProtectedWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate('/captain/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/captain/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCaptain(response.data); // Captains data from backend
        } else {
          localStorage.removeItem('token');
          navigate('/captain/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        navigate('/captain/login');
      } finally {
        setIsLoading(false); // Stop loading in all cases
      }
    };

    checkAuth();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}

export default CaptainProtectedWrapper;
