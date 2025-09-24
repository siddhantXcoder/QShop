import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 tracking-tight">
          Welcome to the <span className="text-purple-600">QShop</span>
        </h1>
        <p className="text-gray-600 mb-6">Your one-stop shop for everything you need.</p>
        <div className="space-y-4">
          <Link
            to="/register" 
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition duration-300 ease-in-out font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;