import { calcRisk } from "./risk";

//ToCalculate
export const calcDiversity = (userResponse) => {
  const diversity_score =
    userResponse.Q4 * 0.1 + userResponse.Q5 * 0.08 + userResponse.Q6 * 0.1;
  2 / calcRisk(userResponse);
  return parseFloat(diversity_score.toFixed(4));
};
