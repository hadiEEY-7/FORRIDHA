import React from 'react';
import { Heart } from 'lucide-react';

const SuccessView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-float-fast bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl max-w-2xl w-full mx-4">
      <div className="relative mb-4">
         <div className="absolute -inset-4 bg-red-500/20 blur-xl rounded-full"></div>
         <img 
            src="https://media1.tenor.com/m/Jm_F1vO9wBwAAAAC/peach-goma-peach-and-goma.gif"
            alt="Celebration Hug"
            className="w-64 h-64 object-contain relative z-10 drop-shadow-lg rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/love/400/300";
            }}
         />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-hand font-bold text-pink-600 drop-shadow-sm px-4 animate-bounce-slight">
          Yaaaaay! ❤️
        </h1>
        
        <p className="text-2xl md:text-4xl font-sans font-bold text-gray-800 leading-relaxed">
          You made me the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-3xl md:text-5xl block mt-2">
            happiest man alive!
          </span> 
        </p>
        
        <p className="text-lg text-gray-700 font-semibold italic">
          I love you so much! 🥰
        </p>
      </div>
      
      <div className="flex gap-6 text-4xl md:text-5xl pt-4 justify-center animate-pulse">
        <span>🥳</span>
        <span>🫣</span>
        <span>💒</span>
        <span>❤️</span>
      </div>
    </div>
  );
};

export default SuccessView;