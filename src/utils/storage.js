const STORAGE_KEY = 'canada_citizenship_progress';

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function getDefaultProgress() {
  return {
    quizScores: {},
    mockExamScores: [],
    totalQuizzesTaken: 0,
    totalMockExamsTaken: 0,
    lastStudyDate: null,
  };
}

export function recordQuizScore(topic, score, total) {
  const progress = getProgress();

  if (!progress.quizScores[topic]) {
    progress.quizScores[topic] = [];
  }

  progress.quizScores[topic].push({
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString(),
  });

  progress.totalQuizzesTaken += 1;
  progress.lastStudyDate = new Date().toISOString();

  saveProgress(progress);
  return progress;
}

export function recordMockExamScore(score, total, timeSpent, answers) {
  const progress = getProgress();

  progress.mockExamScores.push({
    score,
    total,
    percentage: Math.round((score / total) * 100),
    passed: (score / total) >= 0.75,
    timeSpent,
    date: new Date().toISOString(),
    answers,
  });

  progress.totalMockExamsTaken += 1;
  progress.lastStudyDate = new Date().toISOString();

  saveProgress(progress);
  return progress;
}

export function getTopicStats(topic) {
  const progress = getProgress();
  const scores = progress.quizScores[topic] || [];

  if (scores.length === 0) {
    return { attempts: 0, averageScore: 0, bestScore: 0, trend: 'none' };
  }

  const percentages = scores.map(s => s.percentage);
  const averageScore = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);
  const bestScore = Math.max(...percentages);

  let trend = 'stable';
  if (scores.length >= 2) {
    const recent = percentages.slice(-3);
    const older = percentages.slice(0, -3);
    if (older.length > 0) {
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
      if (recentAvg > olderAvg + 5) trend = 'improving';
      else if (recentAvg < olderAvg - 5) trend = 'declining';
    }
  }

  return { attempts: scores.length, averageScore, bestScore, trend };
}

export function getWeakTopics(topics) {
  const progress = getProgress();
  const weakTopics = [];

  for (const topic of topics) {
    const stats = getTopicStats(topic.id);
    if (stats.attempts > 0 && stats.averageScore < 75) {
      weakTopics.push({ ...topic, stats });
    }
  }

  return weakTopics.sort((a, b) => a.stats.averageScore - b.stats.averageScore);
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
