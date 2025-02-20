import { Question } from "../questions/question";
import { ArcStep } from "./arcStep";
import { CornerEndStep } from "./cornerEndStep";
import { DownLineStep } from "./downLineStep";
import { StepType } from "./stepType";

export function moveDown(
  currentStep: DownLineStep,
  question: Question
): ArcStep | CornerEndStep {
  const arcSteps = question.circles
    .flatMap((circle) => {
      const delta =
        Math.pow(circle.radius, 2) -
        Math.pow(question.area.width - circle.x, 2);

      if (delta < 0) {
        return [];
      }

      const ys = [circle.y - Math.sqrt(delta), circle.y + Math.sqrt(delta)];

      return ys.map<ArcStep>((y) => ({
        type: StepType.ArcStep,
        x: question.area.width,
        y,
        circle,
      }));
    })
    .filter((arcStep) => arcStep.y > currentStep.y)
    .filter((arcStep) => arcStep.y < question.area.height)
    .sort((a, b) => a.y - b.y);

  if (arcSteps.length > 0) {
    return arcSteps[0];
  }

  return { type: StepType.CornerEnd };
}
