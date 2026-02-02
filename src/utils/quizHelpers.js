export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomQuestions(questions, count) {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
}

export function getQuestionsByTopic(questions, topicId) {
  return questions.filter(q => q.topic === topicId);
}

export function calculateScore(answers, questions) {
  let correct = 0;
  const results = [];

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userAnswer = answers[i];
    const isCorrect = userAnswer === question.correctIndex;

    if (isCorrect) correct++;

    results.push({
      question,
      userAnswer,
      isCorrect,
    });
  }

  return {
    score: correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    passed: (correct / questions.length) >= 0.75,
    results,
  };
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getWeightedRandomQuestions(questions, count, topicWeights = null) {
  if (!topicWeights) {
    return getRandomQuestions(questions, count);
  }

  const weightedQuestions = [];
  const totalWeight = Object.values(topicWeights).reduce((a, b) => a + b, 0);

  for (const [topic, weight] of Object.entries(topicWeights)) {
    const topicQuestions = getQuestionsByTopic(questions, topic);
    const topicCount = Math.round((weight / totalWeight) * count);
    const selected = getRandomQuestions(topicQuestions, topicCount);
    weightedQuestions.push(...selected);
  }

  if (weightedQuestions.length < count) {
    const remaining = questions.filter(q => !weightedQuestions.includes(q));
    const extra = getRandomQuestions(remaining, count - weightedQuestions.length);
    weightedQuestions.push(...extra);
  }

  return shuffleArray(weightedQuestions).slice(0, count);
}
