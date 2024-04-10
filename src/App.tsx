import { Routes, Route } from 'react-router-dom';
import Slider from './components/Slider';
import Home from './pages/Home';
import Services from './pages/Services';
import { Login } from './pages/Login';
import Private from './context/Private';
import Pricing from './pages/pricing';
import Footer from './components/Footer';
import IdeaGenerator from './pages/IdeaGenerator';
import UrlProcess from './pages/UrlProcess';
import Thumbnail from './pages/thumbnail';
import Dashboard from './pages/profile';
import { Register } from './pages/register';
import { Navbar } from './components/Navbar';
import { Toaster } from './components/ui/toaster';
import Admin from './context/Admin';
import Verification from './context/Verified';
import GoogleTest from './components/GoogleTest';

function App() {

  
  return (
    <>
      <Navbar />
      <Slider />
      <Routes>
        <Route path="/" element={<Private Component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google" element={<GoogleTest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Private Component={Services} />} />
        <Route path="/pricing" element={<Private Component={Pricing} />} />
        <Route path="/dashboard" element={<Admin Component={Dashboard} />} />
        <Route path="/services/idea-generator" element={<Verification Component={IdeaGenerator} />} />
        <Route path="/services/url-processing" element={<Verification Component={UrlProcess} />} />
        <Route path="/services/thumbnail-processing" element={<Verification Component={Thumbnail} />} />
      </Routes>
      <br/>
      <Slider />
      <Footer/>
      <Toaster />
    </>
  );
}

export default App;
