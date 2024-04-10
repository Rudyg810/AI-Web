// Private.tsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Private(props) {
  let userData;
  const {Component} = props
  const data = localStorage.getItem("auth");
    if(data){
      const decoded_data = jwtDecode(data)
      if (decoded_data) {
        userData = decoded_data?.data;
      }
    }

  if (userData && userData.name && userData.email) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Private;
