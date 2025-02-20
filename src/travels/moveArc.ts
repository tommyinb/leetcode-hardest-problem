import { Circle } from "../questions/circle";
import { Question } from "../questions/question";
import { ArcStep } from "./arcStep";
import { Step } from "./step";
import { StepType } from "./stepType";

export function moveArc(currentStep: ArcStep, question: Question) {
  const currentAngle =
    (Math.atan2(
      currentStep.y - currentStep.circle.y,
      currentStep.x - currentStep.circle.x
    ) +
      4 * Math.PI) %
    (2 * Math.PI);

  const inputNexts = [
    ...getRightNexts(currentStep, question),
    ...getDownNexts(currentStep, question),
    ...getLeftNexts(currentStep, question),
    ...getBottomNexts(currentStep, question),
    ...getArcNexts(currentStep, question),
  ];

  if (inputNexts.length <= 0) {
    return undefined;
  }

  const outputNexts = inputNexts
    .map((next) => {
      const nextAngle = (next.angle + 4 * Math.PI) % (2 * Math.PI);

      const moveAngle = nextAngle - currentAngle;

      const positiveAngle =
        moveAngle < -0.000001
          ? (moveAngle + 4 * Math.PI) % (2 * Math.PI)
          : moveAngle;

      const randomAngle = positiveAngle + Math.random() * 0.000001;

      return {
        angle: randomAngle,
        step: next.step,
      };
    })
    .sort((a, b) => a.angle - b.angle);

  return outputNexts[outputNexts.length - 1].step;
}

interface Next {
  angle: number;
  step: Step;
}

function getRightNexts(currentStep: ArcStep, question: Question): Next[] {
  return getXIntersections(currentStep, 0, question).map((intersection) => ({
    angle: intersection.angle,
    step: { type: StepType.RightLine, x: intersection.x },
  }));
}

function getXIntersections(
  currentStep: ArcStep,
  y: number,
  question: Question
) {
  const delta =
    currentStep.circle.radius ** 2 - (y - currentStep.circle.y) ** 2;

  if (delta < 0) {
    return [];
  }

  const xs = [
    currentStep.circle.x + Math.sqrt(delta),
    currentStep.circle.x - Math.sqrt(delta),
  ];

  return xs
    .filter((x) => x >= 0 && x <= question.area.width)
    .map((x) => {
      const angle = Math.atan2(
        y - currentStep.circle.y,
        x - currentStep.circle.x
      );

      return {
        x,
        angle: angle,
      };
    });
}

function getDownNexts(currentStep: ArcStep, question: Question): Next[] {
  return getYIntersections(currentStep, question.area.width, question).map(
    (intersection) => ({
      angle: intersection.angle,
      step: { type: StepType.DownLine, y: intersection.y },
    })
  );
}

function getYIntersections(
  currentStep: ArcStep,
  x: number,
  question: Question
) {
  const delta =
    currentStep.circle.radius ** 2 - (x - currentStep.circle.x) ** 2;

  if (delta < 0) {
    return [];
  }

  const ys = [
    currentStep.circle.y + Math.sqrt(delta),
    currentStep.circle.y - Math.sqrt(delta),
  ];

  return ys
    .filter((y) => y >= 0 && y <= question.area.height)
    .map((y) => {
      const angle = Math.atan2(
        y - currentStep.circle.y,
        x - currentStep.circle.x
      );

      return {
        y,
        angle: angle,
      };
    });
}

function getLeftNexts(currentStep: ArcStep, question: Question): Next[] {
  return getYIntersections(currentStep, 0, question).map((intersection) => ({
    angle: intersection.angle,
    step: { type: StepType.LeftEnd, y: intersection.y },
  }));
}

function getBottomNexts(currentStep: ArcStep, question: Question): Next[] {
  return getXIntersections(currentStep, question.area.height, question).map(
    (intersection) => ({
      angle: intersection.angle,
      step: { type: StepType.BottomEnd, x: intersection.x },
    })
  );
}

function getArcNexts(currentStep: ArcStep, question: Question) {
  return question.circles
    .filter((circle) => circle !== currentStep.circle)
    .flatMap((circle) =>
      getCircleIntersections(circle, currentStep.circle)
        .filter(
          (intersection) =>
            intersection.x > 0 &&
            intersection.x < question.area.width &&
            intersection.y > 0 &&
            intersection.y < question.area.height
        )
        .map<Next>((intersection) => {
          const circleAngle = Math.atan2(
            intersection.y - currentStep.circle.y,
            intersection.x - currentStep.circle.x
          );

          return {
            angle: circleAngle,
            step: { type: StepType.ArcStep, ...intersection, circle },
          };
        })
    );
}

function getCircleIntersections(a: Circle, b: Circle) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d > a.radius + b.radius || d < Math.abs(a.radius - b.radius)) {
    return [];
  }

  const a2 = (a.radius * a.radius - b.radius * b.radius + d * d) / (2 * d);
  const h = Math.sqrt(a.radius * a.radius - a2 * a2);

  const xm = a.x + (a2 * dx) / d;
  const ym = a.y + (a2 * dy) / d;

  const xs1 = xm + (h * dy) / d;
  const ys1 = ym - (h * dx) / d;

  const xs2 = xm - (h * dy) / d;
  const ys2 = ym + (h * dx) / d;

  return [
    { x: xs1, y: ys1 },
    { x: xs2, y: ys2 },
  ];
}
