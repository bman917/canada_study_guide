import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PracticeQuiz from './pages/PracticeQuiz';
import MockExam from './pages/MockExam';
import Progress from './pages/Progress';
import StudyMaterials from './pages/StudyMaterials';
import Flashcards from './pages/Flashcards';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation />
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<PracticeQuiz />} />
            <Route path="/practice/:topicId" element={<PracticeQuiz />} />
            <Route path="/mock-exam" element={<MockExam />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/study" element={<StudyMaterials />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4 sm:py-6 mt-8 sm:mt-12">
          <div className="container mx-auto px-4 text-center text-xs sm:text-sm">
            <p className="mb-2 leading-relaxed">
              Based on the official "Discover Canada: The Rights and Responsibilities of Citizenship" study guide
            </p>
            <p className="text-gray-400 mb-3">
              For official information, visit{' '}
              <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
                 className="text-red-400 hover:underline break-all sm:break-normal"
                 target="_blank"
                 rel="noopener noreferrer">
                www.canada.ca
              </a>
            </p>
            <p className="text-gray-500 text-xs">
              Created by Jacky • <a href="mailto:bman917@gmail.com" className="hover:text-gray-300">bman917@gmail.com</a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
