import { Circle } from "../questions/circle";

export function pointCovering(x: number, y: number, circle: Circle) {
  const dx = BigInt(x - circle.x);
  const dy = BigInt(y - circle.y);

  return (
    BigInt(dx) * BigInt(dx) + BigInt(dy) * BigInt(dy) <= circle.radius ** 2
  );
}
