function canReachCorner(
  xCorner: number,
  yCorner: number,
  circles: number[][]
): boolean {
  const question: Question = {
    area: { width: xCorner, height: yCorner },
    circles: circles.map(([x, y, radius]) => ({ x, y, radius })),
  };

  if (getCovering(question)) {
    return false;
  }

  const path = explore(question);

  return path.some((step) => step.type === StepType.CornerEnd);
}

interface Area {
  width: number;
  height: number;
}

interface Circle {
  x: number;
  y: number;
  radius: number;
}

interface Question {
  area: Area;
  circles: Circle[];
}

interface ArcStep {
  type: StepType.ArcStep;

  x: number;
  y: number;

  circle: Circle;
}

interface BottomEndStep {
  type: StepType.BottomEnd;

  x: number;
}

interface CornerEndStep {
  type: StepType.CornerEnd;
}

interface DownLineStep {
  type: StepType.DownLine;
  y: number;
}

function explore(question: Question) {
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

interface LeftEndStep {
  type: StepType.LeftEnd;

  y: number;
}

function moveArc(currentStep: ArcStep, question: Question) {
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
    Math.pow(currentStep.circle.radius, 2) -
    Math.pow(y - currentStep.circle.y, 2);

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
    Math.pow(currentStep.circle.radius, 2) -
    Math.pow(x - currentStep.circle.x, 2);

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

function moveDown(
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

function moveRight(
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

function moveStep(
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

interface RightLineStep {
  type: StepType.RightLine;
  x: number;
}

type Step =
  | RightLineStep
  | DownLineStep
  | ArcStep
  | CornerEndStep
  | LeftEndStep
  | BottomEndStep;

enum StepType {
  RightLine = "rightLine",
  DownLine = "downLine",

  ArcStep = "arcStep",

  LeftEnd = "leftEnd",
  BottomEnd = "bottomEnd",

  CornerEnd = "cornerEnd",
}

function getCovering(question: Question) {
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

