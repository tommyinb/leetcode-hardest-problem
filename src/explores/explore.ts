import { Circle } from "../questions/circle";
import { Question } from "../questions/question";
import { intersectingCircle } from "./intersectingCircle";
import { intersectingX } from "./intersectingX";
import { intersectingY } from "./intersectingY";
import { Path } from "./path";
import { pointCovering } from "./pointCovering";

export function explore(question: Question): Path | undefined {
  const startPaths: Path[] = [];
  const endPaths: Path[] = [];

  const currentCircles: Circle[] = [];

  for (const circle of question.circles) {
    if (pointCovering(0, 0, circle)) {
      return { circles: [circle] };
    }

    if (pointCovering(question.area.width, question.area.height, circle)) {
      return { circles: [circle] };
    }

    const start =
      intersectingY(circle, 0, question.area) ||
      intersectingX(circle, question.area.width, question.area);
    if (start) {
      startPaths.push({ circles: [circle] });
    }

    const end =
      intersectingY(circle, question.area.height, question.area) ||
      intersectingX(circle, 0, question.area);
    if (end) {
      endPaths.push({ circles: [circle] });
    }

    if (start && end) {
      return { circles: [circle] };
    }

    if (!start && !end) {
      currentCircles.push(circle);
    }
  }

  for (const startPath of startPaths) {
    const startCircle = startPath.circles[0];
    for (const endPath of endPaths) {
      const endCircle = endPath.circles[0];
      if (intersectingCircle(startCircle, endCircle, question.area)) {
        return { circles: [startCircle, endCircle] };
      }
    }
  }

  let currentCircle: Circle | undefined;
  while ((currentCircle = currentCircles.shift())) {
    let targetPath: Path | undefined = undefined;

    for (const startPath of startPaths) {
      const pathCircle = startPath.circles[startPath.circles.length - 1];
      if (intersectingCircle(currentCircle, pathCircle, question.area)) {
        startPath.circles.push(currentCircle);

        targetPath = startPath;
      }
    }

    for (const endPath of endPaths) {
      const pathCircle = endPath.circles[endPath.circles.length - 1];
      if (intersectingCircle(currentCircle, pathCircle, question.area)) {
        if (targetPath) {
          return {
            circles: [...targetPath.circles, ...endPath.circles.reverse()],
          };
        }

        endPath.circles.push(currentCircle);
      }
    }
  }

  return undefined;
}
