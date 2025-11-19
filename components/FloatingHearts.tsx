import React from 'react';

const FloatingHearts: React.FC = () => {
  // Create an array of random positions/delays for background elements
  const hearts = React.useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.1,
    scale: Math.random() * 0.5 + 0.5,
    animationDuration: `${Math.random() * 10 + 10}s`,
    emoji: ['❤️', '💖', '🌹', '🥰', '💘'][Math.floor(Math.random() * 5)]
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-4xl animate-float"
          style={{
            left: heart.left,
            bottom: '-10%',
            animationDelay: heart.animationDelay,
            opacity: heart.opacity,
            transform: `scale(${heart.scale})`,
            animationDuration: heart.animationDuration,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;