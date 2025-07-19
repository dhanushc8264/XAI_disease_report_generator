import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import DiabetesPage from './pages/Diabetes.jsx';
import HeartPage from './pages/HeartPage.jsx';

export default function App() {
  return (

    
    <>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetes" element={<DiabetesPage />} />
        <Route path="/heart" element={<HeartPage />} />
      </Routes>

    

    </>
  );
}
