import { Question } from "../questions/question";
import { moveStep } from "./moveStep";
import { Step } from "./step";
import { StepType } from "./stepType";

export function explore(question: Question) {
  const path: Step[] = [{ type: StepType.RightLine, x: 0 }];

  while (path.length < question.circles.length * 2 + 10) {
    const lastStep = path[path.length - 1];

    const nextStep = moveStep(lastStep, question);

    if (!nextStep) {
      break;
    }

    path.push(nextStep);
  }

  return path;
}
