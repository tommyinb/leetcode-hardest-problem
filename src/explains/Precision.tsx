import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import { Code } from "./Code";
import "./Precision.css";

export function Precision() {
  return (
    <div className="explains-Precision">
      <Code
        text={`function pointCovering(x: number, y: number, circle: Circle) {
  const dx = BigInt(x - circle.x);
  const dy = BigInt(y - circle.y);

  return (
    BigInt(dx) * BigInt(dx) + BigInt(dy) * BigInt(dy) <= circle.radius ** 2
  );
}`}
      />

      <div className="idea">
        <div className="number">B</div>

        <div className="text">
          They are just so evil that they even use huge numbers, causing you to
          lose precision in calculations and fail the test cases.
        </div>

        <div className="drawing">
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 500000000, height: 500000000 },
                circles: [
                  { x: 499980000, y: 699999999, radius: 200000000 },
                  { x: 500020000, y: 300000001, radius: 200000000 },
                ],
              }),
              []
            )}
            scale={0.0000002}
          />
        </div>
      </div>
    </div>
  );
}
