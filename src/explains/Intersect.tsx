import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import { Code } from "./Code";
import "./Intersect.css";

export function Intersect() {
  return (
    <div className="explains-Intersect">
      <div className="upper">
        <Code
          text={`function intersectingCircle(
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

`}
        />
      </div>

      <div className="code">
        <Code
          text={`  const midpointX =
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
  }`}
        />
      </div>

      <div className="lower">
        <Code
          text={`
  return true;
}`}
        />
      </div>

      <div className="idea">
        <div className="text">
          <div className="number">A</div>

          <div>
            This problem is filled with tricky test cases. For example, even
            when the following two circles touch the borders and intersect,
            their intersection is outside the area, causing no blockage. You
            wouldn't even notice it unless you zoom in! 🤯
          </div>
        </div>

        <div className="image">
          <div className="drawing">
            <Drawing
              question={useMemo(
                () => ({
                  area: { width: 15, height: 15 },
                  circles: [
                    { x: 1, y: 99, radius: 85 },
                    { x: 99, y: 1, radius: 85 },
                  ],
                }),
                []
              )}
              scale={2}
            />
          </div>

          <div className="zoom">
            <div className="content">
              <Drawing
                question={useMemo(
                  () => ({
                    area: { width: 15, height: 15 },
                    circles: [
                      { x: 1, y: 99, radius: 85 },
                      { x: 99, y: 1, radius: 85 },
                    ],
                  }),
                  []
                )}
                scale={70}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
