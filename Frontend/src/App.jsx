import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubjectSelection from './pages/SubjectSelection';
import ClassDetails from './pages/ClassDetails';
import Admin from './pages/Admin';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import logo from './assets/fd_logo.jpg';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('studentToken');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                    src={logo} 
                    alt="Future Developer Logo" 
                    className="h-12 w-auto rounded-lg group-hover:scale-105 transition-transform" 
                />
                <span className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-indigo-800 sm:block">
                    FUTURE DEVELOPER
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                 <Link to="/" className="text-md font-bold text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
                 <Link to="/about" className="text-md font-bold text-gray-600 hover:text-indigo-600 transition-colors">About Us</Link>
                 <Link to="/contact" className="text-md font-bold text-gray-600 hover:text-indigo-600 transition-colors">Contact</Link>
                 <Link to="/notice" className="text-md font-bold text-gray-600 hover:text-indigo-600 transition-colors">Notice Board</Link>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                    to="/login" 
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="hidden sm:inline">Portal Login</span>
                    <span className="sm:hidden">Login</span>
                </Link>
              </div>

            </div>
          </div>
        </nav>

        <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/class/:className" element={<SubjectSelection />} />
              <Route path="/class/:className/:subjectName" element={<ClassDetails />} />
              
              <Route 
                path="/student-dashboard" 
                element={
                  <StudentProtectedRoute>
                    <StudentDashboard />
                  </StudentProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin" 
                element={
                  <AdminProtectedRoute>
                    <Admin />
                  </AdminProtectedRoute>
                } 
              />
            </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;