export const calcRisk = (userResponse) => {
  const risk_score =
    userResponse.Q1 * 0.15 +
    userResponse.Q2 * 0.1 +
    userResponse.Q3 * 0.3 +
    userResponse.Q5 * 0.15 +
    userResponse.Q6 * 0.12 +
    userResponse.Q7 * 0.05 +
    userResponse.Q8 * 0.08;
  return parseFloat(risk_score.toFixed(4));
};
