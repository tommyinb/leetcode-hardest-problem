import { Question } from "../questions/question";
import { getCovering } from "../solutions/getCovering";
import { explore } from "../travels/explore";
import { StepType } from "../travels/stepType";

export function canReachCorner(
  xCorner: number,
  yCorner: number,
  circles: number[][]
): boolean {
  const question: Question = {
    area: { width: xCorner, height: yCorner },
    circles: circles.map(([x, y, radius]) => ({ x, y, radius })),
  };

  if (getCovering(question)) {
    return false;
  }

  const path = explore(question);

  return path.some((step) => step.type === StepType.CornerEnd);
}
