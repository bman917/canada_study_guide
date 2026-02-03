import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''} cursor-pointer touch-manipulation`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner relative w-full min-h-[200px] sm:min-h-[240px] md:h-64">
        <div className="flip-card-front absolute w-full h-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex items-center justify-center border-2 border-gray-200">
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 leading-relaxed">{front}</p>
            <p className="text-xs sm:text-sm text-gray-500">Tap to reveal answer</p>
          </div>
        </div>
        <div className="flip-card-back absolute w-full h-full bg-red-600 text-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-base sm:text-lg font-medium leading-relaxed">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
