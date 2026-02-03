import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Quiz({ questions, onComplete, showFeedback = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (index) => {
    if (showExplanation && showFeedback) return;
    setSelectedAnswer(index);
    if (showFeedback) {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          label={`Question ${currentIndex + 1} of ${questions.length}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctIndex;
            const showCorrect = showExplanation && isCorrectAnswer;
            const showIncorrect = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation && showFeedback}
                className={`w-full text-left p-3 sm:p-4 min-h-[44px] rounded-lg border-2 transition ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                } ${showExplanation && showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                    showCorrect
                      ? 'border-green-500 bg-green-500'
                      : showIncorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-red-600 bg-red-600'
                      : 'border-gray-400'
                  }`}>
                    {showCorrect && <span className="text-white text-xs sm:text-sm">✓</span>}
                    {showIncorrect && <span className="text-white text-xs sm:text-sm">✗</span>}
                    {!showExplanation && isSelected && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />}
                  </div>
                  <span className={`flex-1 text-sm sm:text-base leading-relaxed ${
                    showCorrect ? 'text-green-800 font-medium' : showIncorrect ? 'text-red-800' : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && showFeedback && (
        <div className={`rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`font-semibold mb-2 text-sm sm:text-base ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-5 sm:px-6 py-3 min-h-[44px] bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm sm:text-base"
        >
          {isLastQuestion ? 'Finish' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
