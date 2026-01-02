import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './Home';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
      </Routes>

      <Footer user={user} />
    </BrowserRouter>
  )
}

export default App
