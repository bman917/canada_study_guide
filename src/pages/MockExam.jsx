import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import Timer from '../components/Timer';
import ResultsSummary from '../components/ResultsSummary';
import { getRandomQuestions, calculateScore } from '../utils/quizHelpers';
import { recordMockExamScore } from '../utils/storage';
import questionsData from '../data/questions.json';

const EXAM_DURATION = 45 * 60; // 45 minutes in seconds
const EXAM_QUESTION_COUNT = 20;

export default function MockExam() {
  const [examStarted, setExamStarted] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  const handleStartExam = () => {
    const questions = getRandomQuestions(questionsData.questions, EXAM_QUESTION_COUNT);
    setExamQuestions(questions);
    setExamStarted(true);
    setStartTime(Date.now());
  };

  const handleExamComplete = (answers) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const results = calculateScore(answers, examQuestions);
    setExamResults(results);
    setExamComplete(true);
    recordMockExamScore(results.score, results.total, timeSpent, answers);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    alert('Time is up! The exam will now be submitted.');
  };

  useEffect(() => {
    if (timeUp && examStarted && !examComplete) {
      const emptyAnswers = new Array(examQuestions.length).fill(null);
      handleExamComplete(emptyAnswers);
    }
  }, [timeUp]);

  if (examComplete && examResults) {
    return (
      <div>
        <ResultsSummary
          score={examResults.score}
          total={examResults.total}
          passed={examResults.passed}
          results={examResults.results}
        />
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">Mock Citizenship Exam</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            This mock exam simulates the actual Canadian citizenship test.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-bold text-yellow-900 mb-2 text-sm sm:text-base">Exam Format</h3>
            <ul className="text-xs sm:text-sm text-yellow-800 space-y-1">
              <li>• 20 multiple choice questions</li>
              <li>• 45 minutes to complete</li>
              <li>• Questions from all topics</li>
              <li>• Must score 75% (15/20) to pass</li>
              <li>• No feedback until the end</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-bold text-blue-900 mb-2 text-sm sm:text-base">Tips for Success</h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• Read each question carefully</li>
              <li>• Manage your time (about 2 minutes per question)</li>
              <li>• Answer all questions - there's no penalty for guessing</li>
              <li>• Review your answers if time permits</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full px-5 sm:px-6 py-3 sm:py-4 min-h-[44px] bg-red-600 text-white rounded-lg font-bold text-base sm:text-lg hover:bg-red-700 transition"
          >
            Start Mock Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <Timer
          duration={EXAM_DURATION}
          onTimeUp={handleTimeUp}
          isActive={!examComplete}
        />
      </div>

      <Quiz
        questions={examQuestions}
        onComplete={handleExamComplete}
        showFeedback={false}
      />
    </div>
  );
}
