export const eraColorMap = {
  amber: {
    dot: 'bg-amber-400',
    dotActive: 'bg-amber-600',
    ring: 'ring-amber-200',
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
  blue: {
    dot: 'bg-blue-400',
    dotActive: 'bg-blue-600',
    ring: 'ring-blue-200',
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  emerald: {
    dot: 'bg-emerald-400',
    dotActive: 'bg-emerald-600',
    ring: 'ring-emerald-200',
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  orange: {
    dot: 'bg-orange-400',
    dotActive: 'bg-orange-600',
    ring: 'ring-orange-200',
    border: 'border-l-orange-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
  },
  purple: {
    dot: 'bg-purple-400',
    dotActive: 'bg-purple-600',
    ring: 'ring-purple-200',
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
  },
  red: {
    dot: 'bg-red-400',
    dotActive: 'bg-red-600',
    ring: 'ring-red-200',
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
  },
  yellow: {
    dot: 'bg-yellow-400',
    dotActive: 'bg-yellow-600',
    ring: 'ring-yellow-200',
    border: 'border-l-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
  },
  slate: {
    dot: 'bg-slate-400',
    dotActive: 'bg-slate-600',
    ring: 'ring-slate-200',
    border: 'border-l-slate-500',
    bg: 'bg-slate-50',
    text: 'text-slate-700',
  },
  pink: {
    dot: 'bg-pink-400',
    dotActive: 'bg-pink-600',
    ring: 'ring-pink-200',
    border: 'border-l-pink-500',
    bg: 'bg-pink-50',
    text: 'text-pink-700',
  },
  zinc: {
    dot: 'bg-zinc-400',
    dotActive: 'bg-zinc-600',
    ring: 'ring-zinc-200',
    border: 'border-l-zinc-500',
    bg: 'bg-zinc-50',
    text: 'text-zinc-700',
  },
  sky: {
    dot: 'bg-sky-400',
    dotActive: 'bg-sky-600',
    ring: 'ring-sky-200',
    border: 'border-l-sky-500',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
  },
};

export function groupEventsByEra(events, eras) {
  const eraOrder = eras.map((e) => e.id);
  const groups = {};
  for (const event of events) {
    if (!groups[event.era]) {
      groups[event.era] = [];
    }
    groups[event.era].push(event);
  }
  return eraOrder
    .filter((id) => groups[id]?.length > 0)
    .map((id) => ({
      era: eras.find((e) => e.id === id),
      events: groups[id],
    }));
}
