import { calcRisk } from "./risk";

//ToCalculate
export const calcDiversity = (userResponse) => {
  const diversity_score =
    userResponse["4"] * 0.1 +
    userResponse["5"] * 0.08 +
    userResponse["6"] * 0.1;
  const risk_score = calcRisk(userResponse);
  return parseFloat(diversity_score.toFixed(4));
};
