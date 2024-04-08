export const calcStability = (userResponse) => {
  const stability_score =
    userResponse.Q1 * 0.1 +
    userResponse.Q2 * 0.1 +
    userResponse.Q6 * 0.2 +
    userResponse.Q7 * 0.15 +
    userResponse.Q8 * 0.15 +
    userResponse.Q5 * 0.4;

  return parseFloat(stability_score.toFixed(4));
};
