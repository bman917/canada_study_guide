import { useState } from 'react';

export default function Flashcard({ front, back, trivia }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''} cursor-pointer touch-manipulation`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner relative w-full min-h-[200px] sm:min-h-[240px] md:min-h-[256px]">
        <div className="flip-card-front absolute w-full h-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex items-center justify-center border-2 border-gray-200">
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 leading-relaxed">{front}</p>
            <p className="text-xs sm:text-sm text-gray-500">Tap to reveal answer</p>
          </div>
        </div>
        <div className="flip-card-back absolute w-full h-full bg-red-600 text-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex items-center justify-center">
          <div className="text-center flex flex-col justify-center h-full">
            <p className="text-base sm:text-lg font-medium leading-relaxed">{back}</p>
            {trivia && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-red-400">
                <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                  <span className="font-semibold">Did you know?</span> {trivia}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
