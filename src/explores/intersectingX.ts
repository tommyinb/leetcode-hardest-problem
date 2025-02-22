import { Area } from "../questions/area";
import { Circle } from "../questions/circle";

export function intersectingX(circle: Circle, x: number, area: Area) {
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
