import { Area } from "../questions/area";
import { Circle } from "../questions/circle";

export function intersectingCircle(
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
