import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <div className="text-3xl">🍁</div>
          <div>
            <h1 className="text-2xl font-bold">Canadian Citizenship Exam</h1>
            <p className="text-red-100 text-sm">Study Guide & Practice Tests</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
