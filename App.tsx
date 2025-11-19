import React, { useState, useRef, useEffect } from 'react';
import { Heart, Frown } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import SuccessView from './components/SuccessView';
import { Position } from './types';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState<Position>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const noTexts = ["No", "Are you sure?", "Think again!", "Really?", "Don't do this!", "Click Yes!", "Can't catch me! 🏃‍♂️"];
  
  const getNoText = () => {
    return noTexts[Math.min(hoverCount, noTexts.length - 1)];
  };

  const handleNoInteraction = () => {
    if (!noBtnRef.current) return;
    
    // Increment hover count to change text
    setHoverCount(prev => prev + 1);

    // Get visible window dimensions with padding to keep button inside
    const padding = 60; // Safe area from edges
    const buttonWidth = noBtnRef.current.offsetWidth;
    const buttonHeight = noBtnRef.current.offsetHeight;
    
    const maxWidth = window.innerWidth - buttonWidth - padding;
    const maxHeight = window.innerHeight - buttonHeight - padding;

    // Generate random coordinates
    const randomX = Math.max(padding, Math.random() * maxWidth);
    const randomY = Math.max(padding, Math.random() * maxHeight);

    setNoBtnPosition({ x: randomX, y: randomY });
    setHasMoved(true);
  };

  const handleAccept = () => {
    setAccepted(true);
  };

  // Reset state on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAccepted(false);
        setHasMoved(false);
        setHoverCount(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-red-100 via-pink-200 to-purple-200 flex flex-col items-center justify-center overflow-hidden relative selection:bg-pink-300 selection:text-pink-900"
      ref={containerRef}
    >
      <FloatingHearts />

      <div className="z-10 w-full max-w-3xl flex flex-col items-center justify-center p-4">
        
        {accepted ? (
          <SuccessView />
        ) : (
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center transform transition-all hover:scale-[1.02] duration-300 max-w-full w-full mx-4">
            
            <div className="mb-8 animate-bounce-slight relative">
               <div className="absolute -inset-4 bg-pink-400/20 blur-xl rounded-full"></div>
               <img 
                 src="https://media1.tenor.com/m/16VqWWnUvRUAAAAC/milk-and-mocha-please.gif" 
                 alt="Cute begging bear" 
                 className="w-48 h-48 object-contain drop-shadow-xl relative z-10 rounded-2xl"
                 onError={(e) => {
                    // Fallback if gif fails
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/puppy/200/200";
                 }}
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-hand font-bold text-gray-800 mb-6 drop-shadow-sm text-pink-600">
              Will you be mine? 🌹
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-700 font-sans mb-10 max-w-md leading-relaxed font-medium">
              I promise to make you smile every single day! <br/>
              <span className="italic text-pink-600">Please?</span> 🥺👉👈
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full relative min-h-[100px]">
              {/* YES Button */}
              <button
                onClick={handleAccept}
                className="group relative px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold rounded-full text-2xl shadow-xl transform transition-all hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-green-200/50 w-full md:w-auto min-w-[160px]"
              >
                <span className="flex items-center justify-center gap-3">
                  YES! <Heart className="w-6 h-6 fill-white animate-pulse" />
                </span>
              </button>

              {/* NO Button */}
              <button
                ref={noBtnRef}
                onMouseEnter={handleNoInteraction}
                onTouchStart={(e) => {
                    // e.preventDefault(); // Optional: preventing default can help on some touch devices
                    handleNoInteraction();
                }}
                onClick={handleNoInteraction}
                style={
                  hasMoved
                    ? {
                        position: 'fixed',
                        left: noBtnPosition.x,
                        top: noBtnPosition.y,
                        zIndex: 50,
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy transition
                      }
                    : {}
                }
                className={`px-10 py-5 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold rounded-full text-2xl shadow-xl focus:outline-none ring-4 ring-red-200/50 transition-all duration-200 w-full md:w-auto min-w-[160px] ${
                  !hasMoved ? 'hover:scale-110' : ''
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {getNoText()} <Frown className="w-6 h-6" />
                </span>
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default App;