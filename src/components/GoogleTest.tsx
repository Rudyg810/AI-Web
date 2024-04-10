import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const GoogleTest = () => {
    const [decoded_data,setDecoded_data] = useState({})

  return (
    <div>
       <GoogleLogin
  onSuccess={async(credentialResponse) => {
    console.log(credentialResponse);
    const decodedToken = jwtDecode(credentialResponse?.credential);
    setDecoded_data(decodedToken);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </div>
  )
}

export default GoogleTest
