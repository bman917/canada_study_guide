import { useState } from 'react';
import studyContent from '../data/studyContent.json';

export default function StudyMaterials() {
  const [selectedTopic, setSelectedTopic] = useState(studyContent.topics[0]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Study Guide</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Review key facts and information organized by topic from the official Discover Canada guide.
        </p>
      </div>

      {/* Mobile: Dropdown selector */}
      <div className="block lg:hidden mb-4">
        <select
          value={selectedTopic.id}
          onChange={(e) => setSelectedTopic(studyContent.topics.find(t => t.id === e.target.value))}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:border-red-500"
        >
          {studyContent.topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Desktop: Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
            <h3 className="font-bold mb-3 text-gray-800">Topics</h3>
            <div className="space-y-2">
              {studyContent.topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left px-3 py-2 min-h-[44px] rounded transition text-sm ${
                    selectedTopic.id === topic.id
                      ? 'bg-red-600 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">{selectedTopic.name}</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">{selectedTopic.summary}</p>

            <h3 className="text-base sm:text-lg font-bold mb-3 text-gray-800">Key Facts to Remember</h3>
            <ul className="space-y-2 sm:space-y-3">
              {selectedTopic.keyFacts.filter(fact => fact !== '').map((fact, index) => {
                const isHeader = /^[A-Z][A-Z\s/&]+:$/.test(fact);
                return isHeader ? (
                  <li key={index} className="pt-3 first:pt-0">
                    <span className="text-xs sm:text-sm font-semibold text-red-700 uppercase tracking-wide">{fact}</span>
                  </li>
                ) : (
                  <li key={index} className="flex gap-2 sm:gap-3">
                    <span className="text-red-600 font-bold flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{fact}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded">
        <h3 className="font-bold text-blue-900 mb-2 text-sm sm:text-base">Study Tip</h3>
        <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
          After reviewing this material, test your knowledge with practice quizzes on each topic.
          This will help reinforce what you've learned and identify areas that need more study.
        </p>
      </div>
    </div>
  );
}
