import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import config from '@/lib/config';
import Spinner from '@/components/Spinner';

function Verification(props) {
  const [verification, setverification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { Component } = props;
  let v;
  const data = localStorage.getItem("auth");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data) {
          const decoded_data = jwtDecode(data);
          if (decoded_data) {
            const userData = decoded_data?.data;
            const id = userData.userId;
            const response = await axios.get(`${config.port}/api/v1/auth/get-user/${id}`);
            console.log("verfication")
            console.log(response?.data?.verfied)
            console.log("verfication")

            if (response.data.verfied === true) {
              await setverification(true);
            }

            setUserData(userData);
          }
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error gracefully (e.g., show a message to the user)
      } finally {
        setLoading(false);
      }
    };
    

    // Call the asynchronous function
    fetchData();
    
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  console.log("verfication")
  console.log(verification)
  console.log("verfication")
  if (verification ) {
    
    return <Component />;
  } else {

    return <Navigate to="/user-dashboard" />;
  }
}

export default Verification;
