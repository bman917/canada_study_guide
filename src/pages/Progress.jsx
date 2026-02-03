import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProgress, getTopicStats, getWeakTopics, clearProgress } from '../utils/storage';
import questionsData from '../data/questions.json';

export default function Progress() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const progress = getProgress();
  const weakTopics = getWeakTopics(questionsData.topics);

  const handleClearProgress = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    if (confirmText.trim().toUpperCase() === 'DELETE') {
      clearProgress();
      setIsModalOpen(false);
      setConfirmText('');
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setConfirmText('');
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  if (progress.totalQuizzesTaken === 0 && progress.totalMockExamsTaken === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4">📊</div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">No Progress Yet</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Start taking quizzes and mock exams to track your progress!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/practice"
              className="px-5 sm:px-6 py-3 min-h-[44px] bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition text-sm sm:text-base flex items-center justify-center"
            >
              Start Practice Quiz
            </Link>
            <Link
              to="/mock-exam"
              className="px-5 sm:px-6 py-3 min-h-[44px] bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition text-sm sm:text-base flex items-center justify-center"
            >
              Take Mock Exam
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Progress</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your performance and identify areas for improvement</p>
        </div>
        <button
          onClick={handleClearProgress}
          className="px-4 py-2 min-h-[44px] text-xs sm:text-sm text-red-600 hover:text-red-700 hover:underline"
        >
          Clear Progress
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{progress.totalQuizzesTaken}</div>
          <div className="text-sm sm:text-base text-gray-600">Practice Quizzes Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{progress.totalMockExamsTaken}</div>
          <div className="text-sm sm:text-base text-gray-600">Mock Exams Taken</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
            {progress.mockExamScores.filter(s => s.passed).length}
          </div>
          <div className="text-sm sm:text-base text-gray-600">Mock Exams Passed</div>
        </div>
      </div>

      {progress.mockExamScores.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Mock Exam History</h2>

          {/* Mobile: Card layout */}
          <div className="block sm:hidden space-y-3">
            {progress.mockExamScores.map((exam, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(exam.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    exam.passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {exam.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">
                    {exam.score} / {exam.total}
                  </span>
                  <span className={`font-bold text-lg ${
                    exam.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {exam.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm">Date</th>
                  <th className="text-left py-2 px-4 text-sm">Score</th>
                  <th className="text-left py-2 px-4 text-sm">Percentage</th>
                  <th className="text-left py-2 px-4 text-sm">Result</th>
                </tr>
              </thead>
              <tbody>
                {progress.mockExamScores.map((exam, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-600">
                      {new Date(exam.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 font-medium text-sm">
                      {exam.score} / {exam.total}
                    </td>
                    <td className="py-2 px-4">
                      <span className={`font-bold ${
                        exam.passed ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {exam.percentage}%
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        exam.passed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {exam.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Performance by Topic</h2>
        <div className="space-y-4">
          {questionsData.topics.map(topic => {
            const stats = getTopicStats(topic.id);
            if (stats.attempts === 0) return null;

            return (
              <div key={topic.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{topic.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{stats.attempts} attempts</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-xl sm:text-2xl font-bold ${
                      stats.averageScore >= 75 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {stats.averageScore}%
                    </div>
                    <div className="text-xs text-gray-500">average</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span>Best: {stats.bestScore}%</span>
                  {stats.trend === 'improving' && (
                    <span className="text-green-600 font-medium">📈 Improving</span>
                  )}
                  {stats.trend === 'declining' && (
                    <span className="text-yellow-600 font-medium">📉 Declining</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {weakTopics.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-6 rounded">
          <h3 className="font-bold text-yellow-900 mb-3 text-sm sm:text-base">Topics Needing More Practice</h3>
          <div className="space-y-2">
            {weakTopics.map(topic => (
              <div key={topic.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <Link
                  to={`/practice/${topic.id}`}
                  className="text-yellow-800 hover:underline text-sm sm:text-base min-h-[44px] flex items-center"
                >
                  {topic.name}
                </Link>
                <span className="text-xs sm:text-sm text-yellow-700">
                  {topic.stats.averageScore}% average
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <ClearProgressModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmClear}
          confirmText={confirmText}
          setConfirmText={setConfirmText}
        />
      )}
    </div>
  );
}

function ClearProgressModal({ isOpen, onClose, onConfirm, confirmText, setConfirmText }) {
  const isDeleteEnabled = confirmText.trim().toUpperCase() === 'DELETE';

  useEffect(() => {
    if (isOpen) {
      const inputElement = document.getElementById('confirm-delete-input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isOpen]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isDeleteEnabled) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6 border-l-4 border-red-500">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>⚠️</span>
            <span>Clear All Progress</span>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-gray-700 mb-4">
          This action will permanently delete all your quiz scores, mock exam results, and progress history. This cannot be undone.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <p className="text-xs sm:text-sm text-blue-800">
            To confirm, please type <strong>DELETE</strong> in the box below:
          </p>
        </div>

        <input
          id="confirm-delete-input"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type DELETE to confirm"
          className="w-full px-3 sm:px-4 py-2 min-h-[44px] text-sm sm:text-base border border-gray-300 rounded focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[44px] bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-medium text-sm sm:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isDeleteEnabled}
            className={`px-4 py-2 min-h-[44px] rounded transition font-medium text-sm sm:text-base order-1 sm:order-2 ${
              isDeleteEnabled
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Clear Progress
          </button>
        </div>
      </div>
    </div>
  );
}
