
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AminPanel from './AminPanel'; // Replace with your actual Admin Panel component
import Register from './Register';
const App = () => {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <Router>
      <Routes>
      <Route path="/Register" element={<Register />} /> {/* Pass setUser function as prop */}

        <Route path="/Login" element={<Login setUser={setUser} />} /> {/* Pass setUser function as prop */}
        <Route path="/AminPanel" element={user ? <AminPanel /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;

