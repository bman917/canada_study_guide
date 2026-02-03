import { useState } from 'react';
import Flashcard from '../components/Flashcard';
import flashcardsData from '../data/flashcards.json';

export default function Flashcards() {
  const [selectedCategory, setSelectedCategory] = useState(flashcardsData.categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = selectedCategory.cards[currentIndex];
  const totalCards = selectedCategory.cards.length;

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Flashcards</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Review key facts, dates, and important information. Tap cards to flip them.
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {flashcardsData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 sm:px-4 py-2 min-h-[44px] rounded-lg font-medium whitespace-nowrap transition text-sm sm:text-base ${
                selectedCategory.id === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6 text-center text-sm sm:text-base text-gray-600">
          Card {currentIndex + 1} of {totalCards}
        </div>

        <Flashcard key={currentIndex} front={currentCard.front} back={currentCard.back} />

        <div className="flex justify-between items-center mt-4 sm:mt-6 gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 sm:px-6 py-2 sm:py-3 min-h-[44px] bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base flex-1 sm:flex-initial"
          >
            <span className="hidden sm:inline">← Previous</span>
            <span className="sm:hidden">←</span>
          </button>

          <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
            {currentIndex + 1} / {totalCards}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            className="px-4 sm:px-6 py-2 sm:py-3 min-h-[44px] bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base flex-1 sm:flex-initial"
          >
            <span className="hidden sm:inline">Next →</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <button
          onClick={() => setCurrentIndex(0)}
          className="text-red-600 hover:underline text-xs sm:text-sm min-h-[44px] inline-flex items-center"
        >
          Restart from beginning
        </button>
      </div>
    </div>
  );
}
