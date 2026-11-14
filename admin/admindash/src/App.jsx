import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/authContext';
import Login from './components/Login';
import './App.css';

// Page placeholders (we will build full API-connected components for these next!)
const Home = () => (
  <div className="p-12 max-w-4xl mx-auto text-center">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Full-Stack Portfolio Application</h1>
    <p className="text-gray-600 text-lg mb-6">
      Explore my projects, professional qualifications, and get in touch. Log in as an admin to manage content.
    </p>
  </div>
);

const Projects = () => (
  <div className="p-8 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
      {/* Admin CRUD create button will be conditionally rendered here */}
    </div>
    <p className="text-gray-600">Project list fetched from backend API will appear here.</p>
  </div>
);

const Qualifications = () => (
  <div className="p-8 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Qualifications & Education</h2>
      {/* Admin CRUD create button will be conditionally rendered here */}
    </div>
    <p className="text-gray-600">Qualifications list fetched from backend API will appear here.</p>
  </div>
);

function App() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex space-x-8 items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">Portfolio</Link>
          <Link to="/projects" className="text-gray-600 hover:text-blue-600 font-medium transition">Projects</Link>
          <Link to="/qualifications" className="text-gray-600 hover:text-blue-600 font-medium transition">Qualifications</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Hi, <span className="font-semibold text-gray-900">{user.name}</span>
                <span className={`ml-2 px-2.5 py-0.5 text-xs rounded-full uppercase tracking-wider ${isAdmin ? 'bg-purple-100 text-purple-700 font-bold' : 'bg-gray-100 text-gray-600'}`}>
                  {user.role}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content / Dynamic Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;