import { Question } from "../questions/question";

export function getCovering(question: Question) {
  return (
    question.circles.find((circle) => {
      const x = BigInt(circle.x);
      const y = BigInt(circle.y);
      const radius = BigInt(circle.radius);

      return x * x + y * y <= radius * radius;
    }) ??
    question.circles.find((circle) => {
      const x = BigInt(circle.x - question.area.width);
      const y = BigInt(circle.y - question.area.height);
      const radius = BigInt(circle.radius);

      return x * x + y * y <= radius * radius;
    })
  );
}
