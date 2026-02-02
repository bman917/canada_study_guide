import { Link } from 'react-router-dom';
import { getProgress, getTopicStats, getWeakTopics, clearProgress } from '../utils/storage';
import questionsData from '../data/questions.json';

export default function Progress() {
  const progress = getProgress();
  const weakTopics = getWeakTopics(questionsData.topics);

  const handleClearProgress = () => {
    if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      clearProgress();
      window.location.reload();
    }
  };

  if (progress.totalQuizzesTaken === 0 && progress.totalMockExamsTaken === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">No Progress Yet</h1>
          <p className="text-gray-600 mb-6">
            Start taking quizzes and mock exams to track your progress!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/practice"
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Start Practice Quiz
            </Link>
            <Link
              to="/mock-exam"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
          <p className="text-gray-600">Track your performance and identify areas for improvement</p>
        </div>
        <button
          onClick={handleClearProgress}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:underline"
        >
          Clear Progress
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">{progress.totalQuizzesTaken}</div>
          <div className="text-gray-600">Practice Quizzes Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-purple-600 mb-2">{progress.totalMockExamsTaken}</div>
          <div className="text-gray-600">Mock Exams Taken</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {progress.mockExamScores.filter(s => s.passed).length}
          </div>
          <div className="text-gray-600">Mock Exams Passed</div>
        </div>
      </div>

      {progress.mockExamScores.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mock Exam History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Score</th>
                  <th className="text-left py-2 px-4">Percentage</th>
                  <th className="text-left py-2 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {progress.mockExamScores.map((exam, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-600">
                      {new Date(exam.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 font-medium">
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

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Performance by Topic</h2>
        <div className="space-y-4">
          {questionsData.topics.map(topic => {
            const stats = getTopicStats(topic.id);
            if (stats.attempts === 0) return null;

            return (
              <div key={topic.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{stats.attempts} attempts</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      stats.averageScore >= 75 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {stats.averageScore}%
                    </div>
                    <div className="text-xs text-gray-500">average</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
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
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="font-bold text-yellow-900 mb-3">Topics Needing More Practice</h3>
          <div className="space-y-2">
            {weakTopics.map(topic => (
              <div key={topic.id} className="flex justify-between items-center">
                <Link
                  to={`/practice/${topic.id}`}
                  className="text-yellow-800 hover:underline"
                >
                  {topic.name}
                </Link>
                <span className="text-sm text-yellow-700">
                  {topic.stats.averageScore}% average
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
