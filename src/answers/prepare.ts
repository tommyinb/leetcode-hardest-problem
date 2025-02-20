import { explore } from "../travels/explore";
import { StepType } from "../travels/stepType";

function canReachCorner(
  xCorner: number,
  yCorner: number,
  circles: number[][]
): boolean {
  const path = explore({
    area: { width: xCorner, height: yCorner },
    circles: circles.map(([x, y, radius]) => ({ x, y, radius })),
  });

  return path.some((step) => step.type === StepType.CornerEnd);
}
