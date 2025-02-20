import { Question } from "../questions/question";
import { moveArc } from "./moveArc";
import { moveDown } from "./moveDown";
import { moveRight } from "./moveRight";
import { Step } from "./step";
import { StepType } from "./stepType";

export function nextStep(
  currentStep: Step,
  question: Question
): Step | undefined {
  switch (currentStep.type) {
    case StepType.RightLine:
      return moveRight(currentStep, question);

    case StepType.DownLine:
      return moveDown(currentStep, question);

    case StepType.ArcStep:
      return moveArc(currentStep, question);
  }

  return undefined;
}
