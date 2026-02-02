import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import ResultsSummary from '../components/ResultsSummary';
import TopicCard from '../components/TopicCard';
import { getQuestionsByTopic, calculateScore, shuffleArray } from '../utils/quizHelpers';
import { recordQuizScore } from '../utils/storage';
import questionsData from '../data/questions.json';

export default function PracticeQuiz() {
  const { topicId } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  if (!topicId) {
    const questionsByTopic = questionsData.questions.reduce((acc, q) => {
      acc[q.topic] = (acc[q.topic] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Practice Quizzes</h1>
          <p className="text-gray-600">
            Choose a topic to practice. You'll get immediate feedback and explanations for each question.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionsData.topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              questionCount={questionsByTopic[topic.id] || 0}
            />
          ))}
        </div>
      </div>
    );
  }

  const topic = questionsData.topics.find(t => t.id === topicId);
  const allTopicQuestions = getQuestionsByTopic(questionsData.questions, topicId);

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Topic not found</p>
        <Link to="/practice" className="text-red-600 hover:underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const handleStartQuiz = () => {
    const shuffled = shuffleArray(allTopicQuestions);
    setQuizQuestions(shuffled);
    setQuizStarted(true);
  };

  const handleQuizComplete = (answers) => {
    const results = calculateScore(answers, quizQuestions);
    setQuizResults(results);
    setQuizComplete(true);
    recordQuizScore(topicId, results.score, results.total);
  };

  if (quizComplete && quizResults) {
    return (
      <div>
        <div className="mb-6">
          <Link to="/practice" className="text-red-600 hover:underline">
            ← Back to topics
          </Link>
        </div>
        <ResultsSummary
          score={quizResults.score}
          total={quizResults.total}
          passed={quizResults.passed}
          results={quizResults.results}
        />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/practice" className="text-red-600 hover:underline">
            ← Back to topics
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{topic.name}</h1>
          <p className="text-gray-600 mb-6">{topic.description}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>This quiz contains {allTopicQuestions.length} questions</strong> about {topic.name.toLowerCase()}.
              You'll receive immediate feedback after each answer.
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/practice" className="text-red-600 hover:underline">
          ← Back to topics
        </Link>
      </div>
      <Quiz
        questions={quizQuestions}
        onComplete={handleQuizComplete}
        showFeedback={true}
      />
    </div>
  );
}
