import { useState } from 'react';
import TimelineEvent from './TimelineEvent';
import { groupEventsByEra } from '../utils/timelineHelpers';

export default function Timeline({ events, eras }) {
  const [expandedId, setExpandedId] = useState(null);
  const [activeEra, setActiveEra] = useState(null);

  const filteredEvents = activeEra
    ? events.filter((e) => e.era === activeEra)
    : events;

  const filteredEras = activeEra
    ? eras.filter((e) => e.id === activeEra)
    : eras;

  const groups = groupEventsByEra(filteredEvents, filteredEras);

  const getEventId = (event) => `${event.year}-${event.title}`;

  const handleToggle = (event) => {
    const id = getEventId(event);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Era filter pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <button
          onClick={() => { setActiveEra(null); setExpandedId(null); }}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition min-h-[32px] ${
            !activeEra
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Eras
        </button>
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => { setActiveEra(era.id === activeEra ? null : era.id); setExpandedId(null); }}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition min-h-[32px] ${
              activeEra === era.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {era.name}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative ml-2 sm:ml-4">
        {/* Vertical line */}
        <div className="absolute left-[9px] sm:left-[11px] top-0 bottom-0 w-0.5 bg-gray-200" />

        {groups.map((group) => (
          <div key={group.era.id} className="mb-4 sm:mb-6">
            {/* Era header */}
            <div className="relative pl-10 sm:pl-12 pb-2 sm:pb-3">
              <div className="absolute left-0 sm:left-0.5 top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">
                {group.era.name}
              </h4>
            </div>

            {/* Events in this era */}
            {group.events.map((event) => (
              <TimelineEvent
                key={getEventId(event)}
                event={event}
                eraColor={group.era.color}
                isExpanded={expandedId === getEventId(event)}
                onToggle={() => handleToggle(event)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
