function canReachCorner(
  xCorner: number,
  yCorner: number,
  circles: number[][]
): boolean {
  const question: Question = {
    area: { width: xCorner, height: yCorner },
    circles: circles.map(([x, y, radius]) => ({ x, y, radius })),
  };

  return !explore(question);
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

function explore(question: Question): Path | undefined {
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

function intersectingCircle(
  circle1: Circle,
  circle2: Circle,
  area: Area
) {
  const dx = BigInt(circle1.x - circle2.x);
  const dy = BigInt(circle1.y - circle2.y);

  const radius2 = circle1.radius + circle2.radius;

  if (dx * dx + dy * dy > radius2 ** 2) {
    return false;
  }

  const midpointX =
    (circle1.x * circle2.radius + circle2.x * circle1.radius) / radius2;
  const midPointY =
    (circle1.y * circle2.radius + circle2.y * circle1.radius) / radius2;

  if (
    midpointX < 0 ||
    midpointX > area.width ||
    midPointY < 0 ||
    midPointY > area.height
  ) {
    return false;
  }

  return true;
}

function intersectingX(circle: Circle, x: number, area: Area) {
  const dx = circle.x - x;
  if (Math.abs(dx) <= circle.radius) {
    const xy = (circle.radius ** 2 - dx ** 2) ** 0.5;
    const y1 = circle.y - xy;
    const y2 = circle.y + xy;
    if ((0 < y1 && y1 < area.height) || (0 < y2 && y2 < area.height)) {
      return true;
    }
  }
}

function intersectingY(circle: Circle, y: number, area: Area) {
  const dy = circle.y - y;
  if (Math.abs(dy) <= circle.radius) {
    const yx = (circle.radius ** 2 - dy ** 2) ** 0.5;
    const x1 = circle.x - yx;
    const x2 = circle.x + yx;
    return (0 < x1 && x1 < area.width) || (0 < x2 && x2 < area.width);
  } else {
    return false;
  }
}

interface Path {
  circles: Circle[];
}

function pointCovering(x: number, y: number, circle: Circle) {
  const dx = BigInt(x - circle.x);
  const dy = BigInt(y - circle.y);

  return (
    BigInt(dx) * BigInt(dx) + BigInt(dy) * BigInt(dy) <= circle.radius ** 2
  );
}

