import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''} cursor-pointer`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner relative w-full h-64">
        <div className="flip-card-front absolute w-full h-full bg-white rounded-lg shadow-lg p-8 flex items-center justify-center border-2 border-gray-200">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">{front}</p>
            <p className="text-sm text-gray-500">Click to reveal answer</p>
          </div>
        </div>
        <div className="flip-card-back absolute w-full h-full bg-red-600 text-white rounded-lg shadow-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
