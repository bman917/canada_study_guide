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
      <div className="mb-6">
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          label={`Question ${currentIndex + 1} of ${questions.length}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
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
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                } ${showExplanation && showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showCorrect
                      ? 'border-green-500 bg-green-500'
                      : showIncorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-red-600 bg-red-600'
                      : 'border-gray-400'
                  }`}>
                    {showCorrect && <span className="text-white text-sm">✓</span>}
                    {showIncorrect && <span className="text-white text-sm">✗</span>}
                    {!showExplanation && isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                  <span className={`flex-1 ${
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
        <div className={`rounded-lg p-4 mb-6 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-gray-700">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {isLastQuestion ? 'Finish' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
