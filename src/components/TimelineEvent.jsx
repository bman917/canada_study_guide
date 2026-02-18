import { eraColorMap } from '../utils/timelineHelpers';

export default function TimelineEvent({ event, eraColor, isExpanded, onToggle }) {
  const colors = eraColorMap[eraColor] || eraColorMap.red;

  return (
    <div className="relative pl-10 sm:pl-12 pb-4 sm:pb-6">
      {/* Dot on the timeline */}
      <div
        className={`absolute left-[1px] sm:left-[3px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white transition-all duration-200 ${
          isExpanded
            ? `${colors.dotActive} ring-2 ${colors.ring}`
            : colors.dot
        }`}
      />

      {/* Clickable header */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-2 sm:gap-3 min-h-[44px] group"
      >
        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
          {event.yearDisplay}
        </span>
        <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
          {event.title}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 mt-1 text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expandable detail panel */}
      <div className={`timeline-expand ${isExpanded ? 'open' : ''}`}>
        <div>
          <div className={`mt-2 rounded-lg p-3 sm:p-4 border-l-4 ${colors.border} ${colors.bg}`}>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {event.description}
            </p>

            {event.keyFigures?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {event.keyFigures.map((figure) => (
                  <span
                    key={figure}
                    className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium"
                  >
                    {figure}
                  </span>
                ))}
              </div>
            )}

            {event.examTip && (
              <div className="mt-3 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 p-2 sm:p-3 rounded">
                <span className="font-semibold">Exam tip:</span> {event.examTip}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
