import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import "./Border.css";
import { Code } from "./Code";

export function Border() {
  return (
    <div className="explains-Border">
      <Code
        text={`    const start =
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
    }`}
      />

      <div className="idea">
        <div className="number">2</div>

        <div className="text">
          Next, we look for a chain of circles that starts at the top or right
          side and ends at the bottom or left side. This chain will barricade
          the area.
        </div>

        <div className="drawing">
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 9, y: 5, radius: 2 },
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
