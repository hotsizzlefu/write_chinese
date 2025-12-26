import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { X, Volume2, Play, RotateCcw } from 'lucide-react';
import { playSuccessSound } from '../utils/sound';

const CharacterWriter = ({ char, isTraditional, onClose, onNext }) => {
  const writerRef = useRef(null);
  const [writerInstance, setWriterInstance] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!writerRef.current) return;
    
    // Clear previous instance if any (though we usually unmount)
    writerRef.current.innerHTML = '';

    const writer = HanziWriter.create(writerRef.current, char, {
      width: 260,
      height: 260,
      padding: 5,
      showOutline: true,
      strokeAnimationSpeed: 1, 
      delayBetweenStrokes: 200, 
      radicalColor: '#16a34a', // green-600
    });

    setWriterInstance(writer);
    
    writer.quiz({
      onComplete: () => {
        playSuccessSound();
        setShowSuccess(true);
      }
    });

  }, [char]);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(char);
    utterance.lang = isTraditional ? 'zh-HK' : 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  const animate = () => {
    if (writerInstance) {
      writerInstance.animateCharacter();
    }
  };

  const resetQuiz = () => {
    setShowSuccess(false);
    if (writerInstance) {
      // Cancel animation if playing
      writerInstance.cancelQuiz();
      writerInstance.hideCharacter();
      writerInstance.showOutline();
      writerInstance.quiz({
        onComplete: () => {
          playSuccessSound();
          setShowSuccess(true);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">练习: {char}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center p-6 bg-gray-50 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-inner border border-gray-200 mb-6 relative p-2">
             <div ref={writerRef} className="cursor-crosshair" />
             <button 
               onClick={speak}
               className="absolute top-2 right-2 p-2 text-gray-400 hover:text-green-600 bg-white/80 rounded-full shadow-sm"
             >
               <Volume2 size={24} />
             </button>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={animate}
              className="flex items-center px-6 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 font-bold"
            >
              <Play size={18} className="mr-2" /> 演示
            </button>
            <button
              onClick={resetQuiz}
              className="flex items-center px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 font-bold"
            >
              <RotateCcw size={18} className="mr-2" /> 重写
            </button>
          </div>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center text-white animate-in fade-in zoom-in duration-300 z-10">
            <h3 className="text-4xl font-bold mb-4">太棒了! 🎉</h3>
            <p className="mb-8 text-xl">你写对了!</p>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-full font-bold backdrop-blur-sm transition-colors"
              >
                返回
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  onNext();
                }}
                className="px-8 py-3 bg-white text-green-600 hover:bg-green-50 rounded-full font-bold shadow-lg transition-colors"
              >
                下一题
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterWriter;
