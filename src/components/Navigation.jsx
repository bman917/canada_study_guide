import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/practice', label: 'Practice Quiz' },
    { to: '/mock-exam', label: 'Mock Exam' },
    { to: '/flashcards', label: 'Flashcards' },
    { to: '/study', label: 'Study Guide' },
    { to: '/progress', label: 'Progress' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 sm:px-4 py-3 min-h-[44px] text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition flex items-center ${
                  isActive
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-red-600 hover:border-gray-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
