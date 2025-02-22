import { explore } from "../src/explores/explore";
import { Question } from "../src/questions/question";

export function canReachCorner(
  xCorner: number,
  yCorner: number,
  circles: number[][]
): boolean {
  const question: Question = {
    area: { width: xCorner, height: yCorner },
    circles: circles.map(([x, y, radius]) => ({ x, y, radius })),
  };

  return !explore(question);
}
