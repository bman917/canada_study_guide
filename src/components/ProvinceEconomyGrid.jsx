const regionData = [
  {
    id: 'west',
    name: 'West Coast',
    color: 'teal',
    provinces: [
      {
        abbr: 'BC',
        name: 'British Columbia',
        capital: 'Victoria',
        icon: '🌲',
        signature: 'Forests & Pacific Gateway',
        note: "Canada's Pacific trade hub",
        industries: ['Fish', 'Water resources'],
      },
    ],
  },
  {
    id: 'prairie',
    name: 'Prairie Provinces',
    color: 'amber',
    provinces: [
      {
        abbr: 'AB',
        name: 'Alberta',
        capital: 'Edmonton',
        icon: '🛢️',
        signature: 'Oil & Natural Gas',
        note: "Canada's energy capital",
        industries: ['Agriculture', 'Forestry'],
      },
      {
        abbr: 'SK',
        name: 'Saskatchewan',
        capital: 'Regina',
        icon: '🌾',
        signature: "Canada's Breadbasket",
        note: "40% of Canada's arable land",
        industries: ['Potash mining', 'Natural gas'],
      },
      {
        abbr: 'MB',
        name: 'Manitoba',
        capital: 'Winnipeg',
        icon: '⚡',
        signature: 'Hydro-electric Power',
        note: null,
        industries: ['Agriculture', 'Mining'],
      },
    ],
  },
  {
    id: 'central',
    name: 'Central Canada',
    color: 'blue',
    provinces: [
      {
        abbr: 'ON',
        name: 'Ontario',
        capital: 'Toronto',
        icon: '🚗',
        signature: 'Industrial Heartland',
        note: '1/3 of all Canadians live here',
        industries: ['Mining', 'Tourism'],
      },
      {
        abbr: 'QC',
        name: 'Quebec',
        capital: 'Quebec City',
        icon: '💧',
        signature: 'Hydro-electric & Pulp',
        note: 'Main producer of pulp & paper',
        industries: ['Forestry'],
      },
    ],
  },
  {
    id: 'atlantic',
    name: 'Atlantic Provinces',
    color: 'rose',
    provinces: [
      {
        abbr: 'NB',
        name: 'New Brunswick',
        capital: 'Fredericton',
        icon: '🌲',
        signature: 'Forestry',
        note: 'Only officially bilingual province',
        industries: ['Agriculture', 'Mining'],
      },
      {
        abbr: 'NS',
        name: 'Nova Scotia',
        capital: 'Halifax',
        icon: '⛏️',
        signature: 'Coal Mining',
        note: "Home of Bay of Fundy (world's highest tides)",
        industries: ['Forestry', 'Agriculture'],
      },
      {
        abbr: 'PEI',
        name: 'Prince Edward Island',
        capital: 'Charlottetown',
        icon: '🥔',
        signature: 'Agriculture & Tourism',
        note: 'Famous for potatoes & red soil',
        industries: ['Fishing'],
      },
      {
        abbr: 'NL',
        name: 'Newfoundland & Labrador',
        capital: "St. John's",
        icon: '🐟',
        signature: 'Fisheries & Oil',
        note: 'Last province to join (1949)',
        industries: ['Oil & gas extraction'],
      },
    ],
  },
];

const colors = {
  teal: {
    header: 'bg-teal-600 text-white',
    card: 'border-teal-200 bg-teal-50',
    abbr: 'text-teal-700',
    sig: 'text-teal-800',
    tag: 'bg-teal-100 text-teal-700',
  },
  amber: {
    header: 'bg-amber-500 text-white',
    card: 'border-amber-200 bg-amber-50',
    abbr: 'text-amber-700',
    sig: 'text-amber-800',
    tag: 'bg-amber-100 text-amber-700',
  },
  blue: {
    header: 'bg-blue-600 text-white',
    card: 'border-blue-200 bg-blue-50',
    abbr: 'text-blue-700',
    sig: 'text-blue-800',
    tag: 'bg-blue-100 text-blue-700',
  },
  rose: {
    header: 'bg-rose-600 text-white',
    card: 'border-rose-200 bg-rose-50',
    abbr: 'text-rose-700',
    sig: 'text-rose-800',
    tag: 'bg-rose-100 text-rose-700',
  },
};

export default function ProvinceEconomyGrid() {
  return (
    <div className="space-y-4">
      {regionData.map((region) => {
        const c = colors[region.color];
        return (
          <div key={region.id} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className={`px-4 py-2 text-sm font-bold uppercase tracking-wide ${c.header}`}>
              {region.name}
            </div>
            <div className="flex flex-wrap gap-3 p-3 bg-white">
              {region.provinces.map((p) => (
                <div
                  key={p.abbr}
                  className={`grow shrink basis-36 rounded-lg border p-3 flex flex-col gap-2 ${c.card}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{p.icon}</span>
                    <div>
                      <div className={`text-xl font-extrabold leading-none ${c.abbr}`}>{p.abbr}</div>
                      <div className="text-xs text-gray-500 leading-tight">{p.name}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-semibold">Capital:</span> {p.capital}
                  </div>
                  <div className="border-t border-gray-200" />
                  <div>
                    <div className={`text-sm font-bold leading-snug ${c.sig}`}>{p.signature}</div>
                    {p.note && (
                      <div className="text-xs text-gray-400 italic mt-0.5">{p.note}</div>
                    )}
                  </div>
                  {p.industries.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {p.industries.map((ind) => (
                        <span key={ind} className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.tag}`}>
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
