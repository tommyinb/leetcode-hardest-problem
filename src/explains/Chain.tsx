import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import "./Chain.css";
import { Code } from "./Code";

export function Chain() {
  return (
    <div className="explains-Chain">
      <Code
        text={`  let currentCircle: Circle | undefined;
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
  }`}
      />

      <div className="idea">
        <div className="number">4</div>

        <div className="text">
          Otherwise, we connect all the adjacent circles to form a barrier line.
        </div>

        <div className="drawing">
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 9, y: 5, radius: 2 },
                  { x: 7, y: 3, radius: 2 },
                  { x: 4, y: 4, radius: 2 },
                  { x: 3, y: 7, radius: 2 },
                  { x: 5, y: 9, radius: 2 },
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
