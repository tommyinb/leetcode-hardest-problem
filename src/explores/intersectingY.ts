import { Area } from "../questions/area";
import { Circle } from "../questions/circle";

export function intersectingY(circle: Circle, y: number, area: Area) {
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
