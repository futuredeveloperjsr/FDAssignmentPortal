import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubjectSelection from './pages/SubjectSelection';
import ClassDetails from './pages/ClassDetails';
import Admin from './pages/Admin';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="p-4 bg-white border-b flex justify-between items-center px-6 shadow-sm">
          <Link to="/" className="text-xl font-bold text-blue-600">FUTURE DEVELOPER</Link>
          <Link to="/admin" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">Admin Panel</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/class/:className" element={<SubjectSelection />} />
          <Route path="/class/:className/:subjectName" element={<ClassDetails />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;