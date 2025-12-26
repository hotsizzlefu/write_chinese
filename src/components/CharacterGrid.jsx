import React from 'react';
import { Volume2 } from 'lucide-react';

const CharacterGrid = ({ chars, isTraditional, onSelect }) => {
  const speak = (e, text) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    // Simplified -> zh-CN, Traditional -> zh-HK (Cantonese)
    utterance.lang = isTraditional ? 'zh-HK' : 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {chars.map((char, index) => (
        <div 
          key={`${char}-${index}`}
          className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-400"
          onClick={() => onSelect(char)}
        >
          <div className="flex-1 flex items-center justify-center text-5xl font-serif text-gray-800 relative w-full">
             {char}
             <button
              onClick={(e) => speak(e, char)}
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2">点击练习</div>
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
