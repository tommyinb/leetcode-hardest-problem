import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import { Code } from "./Code";
import "./Covering.css";

export function Covering() {
  return (
    <div className="explains-Covering">
      <Code
        text={`    if (pointCovering(0, 0, circle)) {
      return { circles: [circle] };
    }

    if (pointCovering(question.area.width, question.area.height, circle)) {
      return { circles: [circle] };
    }`}
      />

      <div className="idea">
        <div className="number">1</div>

        <div className="text">
          First of all, any circle covering the origin or a corner is definitely
          an obvious blockage.
        </div>

        <div className="drawing">
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 0, y: 0, radius: 2 },
                  { x: 10, y: 10, radius: 2 },
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
