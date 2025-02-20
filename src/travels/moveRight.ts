import { Question } from "../questions/question";
import { ArcStep } from "./arcStep";
import { DownLineStep } from "./downLineStep";
import { RightLineStep } from "./rightLineStep";
import { StepType } from "./stepType";

export function moveRight(
  currentStep: RightLineStep,
  question: Question
): ArcStep | DownLineStep {
  const arcSteps = question.circles
    .flatMap((circle) => {
      const delta = Math.pow(circle.radius, 2) - Math.pow(0 - circle.y, 2);

      if (delta < 0) {
        return [];
      }

      const xs = [circle.x - Math.sqrt(delta), circle.x + Math.sqrt(delta)];

      return xs.map<ArcStep>((x) => ({
        type: StepType.ArcStep,
        x,
        y: 0,
        circle,
      }));
    })
    .filter((arcStep) => arcStep.x > currentStep.x)
    .filter((arcStep) => arcStep.x < question.area.width)
    .sort((a, b) => a.x - b.x);

  if (arcSteps.length > 0) {
    return arcSteps[0];
  }

  return {
    type: StepType.DownLine,
    y: 0,
  };
}
