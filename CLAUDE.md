# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based web application for studying for the Canadian citizenship exam. Features practice quizzes by topic, timed mock exams, flashcards, and progress tracking using LocalStorage (no backend).

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Data Layer
All exam content is stored in static JSON files in `src/data/`:
- `questions.json`: 299 quiz questions organized by 10 topics, with correct answers and detailed explanations. Includes both federal questions and provincial-specific content (premiers, capitals, economies).
- `flashcards.json`: Flashcard sets for memorization
- `studyContent.json`: Reference materials organized by topic
- `discover-canada/`: Complete official "Discover Canada" study guide in markdown format (14 files covering all chapters: introduction, rights/responsibilities, history, government, elections, justice, symbols, economy, regions, study questions, and appendix)

**Data Sources**:
- Official "Discover Canada" study guide
- Richmond Public Library citizenship test answer keys (https://www.yourlibrary.ca/citizenship-test-answer-keys/)

**Maintenance Note**: Questions about current political leaders (premiers, opposition leaders, Prime Minister) will require periodic updates as governments change.

### State Management
- **No Redux or external state library**: All state is local React state
- **Persistence**: `src/utils/storage.js` handles all LocalStorage operations for progress tracking
- **Progress tracking**: Quiz scores and mock exam results are saved to LocalStorage with the key `canada_citizenship_progress`

### Routing Structure
React Router handles navigation with these routes:
- `/` : Home page with overview
- `/practice` : Topic selection for practice quizzes
- `/practice/:topicId` : Practice quiz for specific topic
- `/mock-exam` : Timed 20-question mock exam (45 minutes)
- `/flashcards` : Interactive flashcard mode
- `/study` : Study materials reference
- `/progress` : User's progress dashboard

### Component Organization
- **Pages** (`src/pages/`): Route-level components that compose smaller components
- **Components** (`src/components/`): Reusable UI components
  - `Quiz.jsx`: Core quiz component used by both practice quizzes and mock exams
  - `Timer.jsx`: Countdown timer for mock exams
  - `ResultsSummary.jsx`: Shows quiz/exam results
  - `Flashcard.jsx`: Interactive flashcard with flip animation

### Quiz Flow Pattern
Both PracticeQuiz and MockExam follow the same state flow:
1. **Not started**: Show intro screen with "Start" button
2. **In progress**: Render `<Quiz>` component with questions
3. **Complete**: Show `<ResultsSummary>` with score and review

Key differences:
- **PracticeQuiz**: Immediate feedback after each answer, questions filtered by topic
- **MockExam**: No feedback during quiz, 45-minute timer, 20 random questions from all topics

### Utility Functions
- `src/utils/quizHelpers.js`: Question selection, shuffling, scoring logic
- `src/utils/storage.js`: LocalStorage persistence for progress tracking

## Styling

Uses Tailwind CSS v4 with PostCSS. No separate tailwind.config.js (uses inline @theme in index.css or defaults).

## Data Format

Questions follow this structure:
```json
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "Why this is the correct answer",
  "topic": "topic-id"
}
```

Topics are defined in `questions.json` with id, name, and description.

## Deployment

This is a static Vite app optimized for Vercel deployment:

```bash
# Deploy via Vercel CLI
npm install -g vercel
vercel
```

Vercel auto-detects Vite configuration and deploys the production build automatically. Alternative platforms include Netlify, Cloudflare Pages, and GitHub Pages.
