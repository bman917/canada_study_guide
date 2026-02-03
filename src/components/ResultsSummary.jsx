import { Link } from 'react-router-dom';

export default function ResultsSummary({ score, total, passed, results, showDetails = true }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className={`rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 text-center ${
        passed ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
      }`}>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-red-800'}`}>
          {passed ? '✓ Passed!' : '✗ Not Passed'}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
          You scored <strong>{score} out of {total}</strong> ({percentage}%)
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          {passed
            ? 'Congratulations! You passed with 75% or higher.'
            : 'You need at least 75% to pass. Keep studying and try again!'}
        </p>
      </div>

      {showDetails && results && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Review Your Answers</h3>
          <div className="space-y-3 sm:space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4 rounded-lg border-2 ${
                  result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className={`font-bold flex-shrink-0 ${
                    result.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {index + 1}.
                  </span>
                  <p className="font-medium text-gray-800 flex-1 text-sm sm:text-base leading-relaxed">
                    {result.question.question}
                  </p>
                </div>

                <div className="ml-4 sm:ml-6 space-y-2">
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Your answer: </span>
                    <span className={`text-xs sm:text-sm ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {result.question.options[result.userAnswer]}
                    </span>
                  </div>

                  {!result.isCorrect && (
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-gray-600">Correct answer: </span>
                      <span className="text-xs sm:text-sm text-green-700">
                        {result.question.options[result.question.correctIndex]}
                      </span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    {result.question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
        <Link
          to="/"
          className="px-5 sm:px-6 py-3 min-h-[44px] bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition text-sm sm:text-base text-center"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-5 sm:px-6 py-3 min-h-[44px] bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
