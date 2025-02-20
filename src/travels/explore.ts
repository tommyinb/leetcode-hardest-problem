import { Question } from "../questions/question";
import { moveStep } from "./moveStep";
import { Step } from "./step";
import { StepType } from "./stepType";

export function explore(question: Question) {
  const path: Step[] = [{ type: StepType.RightLine, x: 0 }];

  const limit = question.circles.length * 3 + 50;

  while (path.length < limit) {
    const lastStep = path[path.length - 1];

    const step = moveStep(lastStep, question);

    if (!step) {
      break;
    }

    path.push(step);
  }

  return path;
}
