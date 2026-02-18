import { useState } from 'react';
import studyContent from '../data/studyContent.json';
import timelineData from '../data/timelineEvents.json';
import Timeline from '../components/Timeline';
import ProvinceEconomyGrid from '../components/ProvinceEconomyGrid';

export default function StudyMaterials() {
  const [selectedTopic, setSelectedTopic] = useState(studyContent.topics[0]);
  const [showTimeline, setShowTimeline] = useState(true);

  const isTimelineTopic = selectedTopic.id in timelineData.topicMapping;
  const topicEraIds = timelineData.topicMapping[selectedTopic.id] || [];
  const topicEvents = timelineData.events
    .filter((e) => topicEraIds.includes(e.era))
    .sort((a, b) => a.year - b.year);
  const topicEras = timelineData.eras.filter((e) => topicEraIds.includes(e.id));

  const isRegionsTopic = selectedTopic.id === 'regions';

  const renderFactItem = (fact, index) => {
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
  };

  const getEconomySplit = () => {
    const before = [];
    const after = [];
    let inEcon = false;
    let pastEcon = false;
    for (const fact of selectedTopic.keyFacts) {
      if (fact === 'PROVINCIAL ECONOMIES:') { inEcon = true; continue; }
      if (inEcon) {
        const isNewHeader = /^[A-Z][A-Z\s/&]+:$/.test(fact);
        if (fact === '' || isNewHeader) { inEcon = false; pastEcon = true; after.push(fact); }
      } else if (pastEcon) {
        after.push(fact);
      } else {
        before.push(fact);
      }
    }
    return { before, after };
  };

  const { before: factsBeforeEcon, after: factsAfterEcon } = isRegionsTopic
    ? getEconomySplit()
    : { before: [], after: [] };

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

            {/* View toggle for timeline-eligible topics */}
            {isTimelineTopic && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                  {showTimeline ? 'Interactive Timeline' : 'Key Facts to Remember'}
                </h3>
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  {showTimeline ? 'Switch to List View' : 'Switch to Timeline View'}
                </button>
              </div>
            )}

            {/* Render timeline or flat list */}
            {isTimelineTopic && showTimeline ? (
              <Timeline events={topicEvents} eras={topicEras} />
            ) : (
              <>
                {!isTimelineTopic && (
                  <h3 className="text-base sm:text-lg font-bold mb-3 text-gray-800">Key Facts to Remember</h3>
                )}
                {isRegionsTopic ? (
                  <>
                    <ul className="space-y-2 sm:space-y-3">
                      {factsBeforeEcon.filter(f => f !== '').map(renderFactItem)}
                    </ul>
                    <div className="mt-6">
                      <span className="text-xs sm:text-sm font-semibold text-red-700 uppercase tracking-wide">Provincial Economies:</span>
                      <div className="mt-3">
                        <ProvinceEconomyGrid />
                      </div>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mt-4">
                      {factsAfterEcon.filter(f => f !== '').map(renderFactItem)}
                    </ul>
                  </>
                ) : (
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedTopic.keyFacts.filter(fact => fact !== '').map(renderFactItem)}
                  </ul>
                )}
              </>
            )}
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
