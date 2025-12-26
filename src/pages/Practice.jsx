import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Languages } from 'lucide-react';
import { ALL_CHARS } from '../data/chars';
import { toTraditional } from '../utils/converter';
import CharacterGrid from '../components/CharacterGrid';
import CharacterWriter from '../components/CharacterWriter';
import cn from 'classnames';

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const Practice = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(0); // 0 = Monday
  const [isTraditional, setIsTraditional] = useState(false);
  const [dailyChars, setDailyChars] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  
  const refreshChars = () => {
    const shuffled = [...ALL_CHARS].sort(() => 0.5 - Math.random());
    setDailyChars(shuffled.slice(0, 20));
  };

  useEffect(() => {
    refreshChars();
  }, [currentDay]);

  const displayChars = isTraditional ? dailyChars.map(toTraditional) : dailyChars;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-gray-600"
        >
          <ArrowLeft size={24} />
          <span className="ml-2 font-bold hidden sm:inline">返回</span>
        </button>

        <div className="flex space-x-1 overflow-x-auto no-scrollbar px-2">
          {DAYS.map((day, index) => (
            <button
              key={day}
              onClick={() => setCurrentDay(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors",
                currentDay === index 
                  ? "bg-green-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsTraditional(!isTraditional)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 flex items-center"
            title={isTraditional ? "Switch to Simplified" : "Switch to Traditional"}
          >
            <Languages size={24} />
            <span className="ml-1 font-bold w-6">{isTraditional ? '繁' : '简'}</span>
          </button>
          <button
            onClick={refreshChars}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            title="Refresh Words"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        <CharacterGrid 
          chars={displayChars} 
          isTraditional={isTraditional} 
          onSelect={setSelectedChar} 
        />
      </main>

      {selectedChar && (
        <CharacterWriter
          char={selectedChar}
          isTraditional={isTraditional}
          onClose={() => setSelectedChar(null)}
          onNext={() => {
             const currentIndex = displayChars.indexOf(selectedChar);
             if (currentIndex < displayChars.length - 1) {
               setSelectedChar(displayChars[currentIndex + 1]);
             } else {
               setSelectedChar(null); 
             }
          }}
        />
      )}
    </div>
  );
};

export default Practice;
