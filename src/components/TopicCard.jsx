import { Link } from 'react-router-dom';
import { getTopicStats } from '../utils/storage';

export default function TopicCard({ topic, questionCount }) {
  const stats = getTopicStats(topic.id);

  return (
    <Link
      to={`/practice/${topic.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-2 border-transparent hover:border-red-200"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-2">{topic.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{topic.description}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{questionCount} questions</span>
        {stats.attempts > 0 && (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${
              stats.averageScore >= 75 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {stats.averageScore}% avg
            </span>
            <span className="text-gray-400">({stats.attempts} attempts)</span>
          </div>
        )}
      </div>

      {stats.trend === 'improving' && (
        <div className="mt-2 text-xs text-green-600 font-medium">📈 Improving</div>
      )}
      {stats.trend === 'declining' && (
        <div className="mt-2 text-xs text-yellow-600 font-medium">📉 Needs practice</div>
      )}
    </Link>
  );
}
