import { Question } from "../questions/question";

export function getCovering(question: Question) {
  return (
    question.circles.find(
      (circle) =>
        Math.pow(circle.x, 2) + Math.pow(circle.y, 2) <=
        Math.pow(circle.radius, 2)
    ) ??
    question.circles.find(
      (circle) =>
        Math.pow(circle.x - question.area.width, 2) +
          Math.pow(circle.y - question.area.height, 2) <=
        Math.pow(circle.radius, 2)
    )
  );
}
