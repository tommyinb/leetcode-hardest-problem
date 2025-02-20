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
    .map((circle) => {
      const delta = Math.pow(circle.radius, 2) - Math.pow(0 - circle.x, 2);

      if (delta < 0) {
        return undefined;
      }

      const y = currentStep.y - Math.sqrt(delta);

      if (y >= question.area.height) {
        return undefined;
      }

      return {
        type: StepType.ArcStep,
        x: 0,
        y,
        circle,
      };
    })
    .filter((arcStep): arcStep is ArcStep => arcStep !== undefined)
    .filter((arcStep) => arcStep.y > 0 && arcStep.y < question.area.height)
    .sort((a, b) => a.y - b.y);

  if (arcSteps.length > 0) {
    return arcSteps[0];
  }

  return { type: StepType.CornerEnd };
}
