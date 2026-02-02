import { Link } from 'react-router-dom';
import { getProgress } from '../utils/storage';

export default function Home() {
  const progress = getProgress();

  const features = [
    {
      title: 'Practice Quizzes',
      description: 'Study by topic with immediate feedback and explanations',
      icon: '📝',
      link: '/practice',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Mock Exam',
      description: '20 questions, 45 minutes - just like the real test',
      icon: '⏱️',
      link: '/mock-exam',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    {
      title: 'Flashcards',
      description: 'Quick review of key facts, dates, and important people',
      icon: '🎴',
      link: '/flashcards',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Study Guide',
      description: 'Review organized summaries of all topics',
      icon: '📚',
      link: '/study',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
    },
    {
      title: 'Track Progress',
      description: 'See your scores and identify areas for improvement',
      icon: '📊',
      link: '/progress',
      color: 'bg-red-50 hover:bg-red-100 border-red-200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Canadian Citizenship Exam Prep</h1>
        <p className="text-lg mb-2">
          Master the official citizenship test with practice quizzes, mock exams, and study materials.
        </p>
        <p className="text-red-100">
          Based on the official "Discover Canada" study guide
        </p>
      </div>

      {progress.totalQuizzesTaken > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{progress.totalQuizzesTaken}</div>
              <div className="text-sm text-gray-600">Practice Quizzes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{progress.totalMockExamsTaken}</div>
              <div className="text-sm text-gray-600">Mock Exams</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {progress.mockExamScores.filter(s => s.passed).length}
              </div>
              <div className="text-sm text-gray-600">Exams Passed</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className={`block p-6 rounded-lg border-2 transition ${feature.color}`}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="font-bold text-blue-900 mb-2">About the Citizenship Test</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 20 multiple choice questions</li>
          <li>• 45 minutes to complete</li>
          <li>• Must score 75% (15/20) or higher to pass</li>
          <li>• Questions cover Canadian history, geography, government, rights, and responsibilities</li>
        </ul>
      </div>
    </div>
  );
}
