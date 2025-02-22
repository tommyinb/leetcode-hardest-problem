import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import { Code } from "./Code";
import "./One.css";

export function One() {
  return (
    <div className="explains-One">
      <Code
        text={`  for (const startPath of startPaths) {
    const startCircle = startPath.circles[0];
    for (const endPath of endPaths) {
      const endCircle = endPath.circles[0];
      if (intersectingCircle(startCircle, endCircle, question.area)) {
        return { circles: [startCircle, endCircle] };
      }
    }
  }`}
      />

      <div className="idea">
        <div className="number">3</div>

        <div className="text">
          If the start and end circles intersect, a barrier is found.
        </div>

        <div className="drawing">
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 9, y: 5, radius: 3 },
                  { x: 5, y: 9, radius: 3 },
                ],
              }),
              []
            )}
            scale={10}
          />
        </div>
      </div>
    </div>
  );
}
