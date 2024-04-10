import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/auth.js';
import config from './lib/config.js';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthContextProvider>
  <GoogleOAuthProvider clientId={config.googleClientId}>
  <App />
  </GoogleOAuthProvider>;
  
  </AuthContextProvider>
    </BrowserRouter>
)