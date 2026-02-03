import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition">
          <div className="text-2xl sm:text-3xl">🍁</div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Canadian Citizenship Exam</h1>
            <p className="text-red-100 text-xs sm:text-sm">Study Guide & Practice Tests</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
