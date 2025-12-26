import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-6xl font-bold text-green-800 mb-12 font-serif">
        儿童练字
      </h1>
      <button
        onClick={() => navigate('/practice')}
        className="px-12 py-4 text-2xl font-bold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105"
      >
        开始练习
      </button>
    </div>
  );
};

export default Home;
