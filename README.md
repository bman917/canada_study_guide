# Canadian Citizenship Exam Study Guide

A comprehensive web application to help users prepare for the Canadian citizenship exam with practice quizzes, timed mock exams, progress tracking, and study materials based on the official "Discover Canada" guide.

## Features

### 1. Practice Quizzes by Topic
- 10 organized topics covering all exam material
- 299 multiple choice questions covering federal and provincial content
- Immediate feedback with detailed explanations
- Track performance by topic

### 2. Timed Mock Exams
- 20 random questions from all topics
- 45-minute countdown timer (matches real exam)
- Pass/fail based on 75% threshold
- Detailed review of all answers

### 3. Progress Tracking
- Track quiz scores by topic over time
- View mock exam history
- Identify weak areas needing more study
- Data persists in browser (LocalStorage)

### 4. Study Materials
- Key facts organized by topic
- Quick reference summaries
- Based on official Discover Canada guide

### 5. Flashcards
- Interactive flashcard mode with flip animation
- Categories: Important Dates, People, Provinces & Capitals, Government, Symbols, Rights & Responsibilities, Regions, Aboriginal Peoples
- Perfect for quick review and memorization

## Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Storage**: LocalStorage (client-side, no backend required)
- **Data**: JSON files for questions and study content

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Project Structure

```
canada_study_guide/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Quiz.jsx
│   │   ├── Timer.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Flashcard.jsx
│   │   ├── ResultsSummary.jsx
│   │   └── TopicCard.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── PracticeQuiz.jsx
│   │   ├── MockExam.jsx
│   │   ├── Progress.jsx
│   │   ├── StudyMaterials.jsx
│   │   └── Flashcards.jsx
│   ├── data/            # JSON data files
│   │   ├── questions.json
│   │   ├── flashcards.json
│   │   └── studyContent.json
│   ├── utils/           # Helper functions
│   │   ├── storage.js
│   │   └── quizHelpers.js
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── docs/                # Official study guide PDF
│   └── discover.pdf
├── index.html
├── package.json
└── README.md
```

## About the Canadian Citizenship Test

The actual citizenship test:
- Contains 20 multiple choice questions
- Must be completed within 45 minutes
- Requires 75% (15/20 correct answers) to pass
- Questions are based on the official "Discover Canada" study guide
- Covers topics including:
  - Canadian history
  - Geography and regions
  - Government and democracy
  - Rights and responsibilities
  - Symbols and traditions

## Data Sources

Questions and study materials are based on:
- **"Discover Canada: The Rights and Responsibilities of Citizenship"** - Official study guide published by Immigration, Refugees and Citizenship Canada
- **Richmond Public Library Citizenship Test Answer Keys** - https://www.yourlibrary.ca/citizenship-test-answer-keys/ (supplementary questions including provincial content)

The official guide can be found in `docs/discover.pdf` or downloaded from:
https://www.canada.ca/en/immigration-refugees-citizenship.html

**Note**: Questions about current political leaders (premiers, opposition leaders, etc.) may require periodic updates as governments change.

## Deployment

### Recommended: Vercel (Free)

1. Push your code to GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Vite and deploys automatically
5. Get a live URL instantly

### Alternative Platforms
- **Netlify**: Similar to Vercel, excellent for static sites
- **Cloudflare Pages**: Fastest CDN, unlimited bandwidth
- **GitHub Pages**: Free hosting (requires build configuration)

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests with:
- Additional questions (ensure they're based on official guide)
- Bug fixes
- UI improvements
- New features

## License

This is an educational project. The official "Discover Canada" study guide content is © Crown Copyright, Government of Canada.

## Disclaimer

This is an unofficial study tool. The only official study guide for the citizenship test is "Discover Canada: The Rights and Responsibilities of Citizenship," available from Immigration, Refugees and Citizenship Canada. Users should use the official guide as their primary resource.

## Support

For official citizenship information, visit:
- Website: https://www.canada.ca
- Call Centre: 1-888-242-2100 (toll-free in Canada)

---

**Good luck with your citizenship exam!** 🍁🇨🇦
