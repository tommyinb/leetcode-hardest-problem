import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import { Exception } from "./Exception";
import "./Explain.css";
import { ExplainPath } from "./ExplainPath";
import { Remind } from "./Remind";
import { Solution } from "./Solution";
import { Wrong } from "./Wrong";

export function Explain() {
  return (
    <div className="tutorials-Explain">
      <div className="pictured">
        <div className="picture" style={{ width: 150, height: 150 }}>
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [{ x: 4, y: 5, radius: 2 }],
              }),
              []
            )}
            scale={15}
          />

          <ExplainPath width={150} height={150}>
            <path
              d="M 10,10
              Q 20,20 40,20
              Q 130,10 120,100
              Q 120,130 140,142"
            />
          </ExplainPath>
        </div>

        <div>
          It is considered as <b>reachable</b> if we can go from the top-left to
          the bottom-right.
        </div>
      </div>

      <div className="pictured">
        <div>
          If there is a circle, go <b>around</b> it.
        </div>

        <div className="picture" style={{ width: 150, height: 150 }}>
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [{ x: 8, y: 2, radius: 2 }],
              }),
              []
            )}
            scale={15}
          />

          <ExplainPath width={150} height={150}>
            <path
              d="M 20,10
              L 80,15
              A 45,45 90 0 0 135,70
              L 140,130"
            />
          </ExplainPath>
        </div>
      </div>

      <div className="pictured">
        <div className="picture" style={{ width: 150, height: 150 }}>
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 8, y: 2, radius: 2 },
                  { x: 7, y: 5, radius: 2 },
                ],
              }),
              []
            )}
            scale={15}
          />

          <ExplainPath width={150} height={150}>
            <path
              d="M 20,10
              L 80,15
              A 30,30 90 0 0 80,40
              A 40,40 50 1 0 135,107
              L 140,130"
            />
          </ExplainPath>
        </div>

        <div>
          If there is another circle, we go <b>around</b> it too.
        </div>
      </div>

      <div className="pictured">
        <div>
          If we loop back to the origin, we can conclude that it is{" "}
          <b>unreachable</b>.
        </div>

        <div className="picture" style={{ width: 150, height: 150 }}>
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 8, y: 2, radius: 2 },
                  { x: 7, y: 5, radius: 2 },
                  { x: 4, y: 7, radius: 2 },
                  { x: 1, y: 8, radius: 2 },
                ],
              }),
              []
            )}
            scale={15}
          />

          <ExplainPath width={150} height={150}>
            <path
              d="M 10,5
              L 90,5
              A 30,30 90 0 0 85,45
              A 30,30 90 0 0 68,70
              A 30,30 90 0 0 28,86
              A 30,30 90 0 0 5,85
              L 5,10"
            />
          </ExplainPath>
        </div>
      </div>

      <div className="line" />

      <div className="pictured">
        <div className="picture" style={{ width: 150, height: 150 }}>
          <Drawing
            question={useMemo(
              () => ({
                area: { width: 10, height: 10 },
                circles: [
                  { x: 8, y: 2, radius: 2 },
                  { x: 7, y: 5, radius: 2 },
                  { x: 4, y: 7, radius: 2 },
                  { x: 1, y: 8, radius: 2 },
                ],
              }),
              []
            )}
            scale={15}
          />

          <ExplainPath width={150} height={150}>
            <path
              d="M 10,5
              L 120,5
              L 120,30
              L 105,75
              L 60,105
              L 15,120
              L 5,120
              L 5,10"
            />
          </ExplainPath>
        </div>

        <div>
          Many people, including the question author, think that they can simply
          join the circle centers together.
        </div>
      </div>

      <Wrong />

      <Exception />

      <div className="line" />

      <Remind />

      <div className="line" />

      <Solution />
    </div>
  );
}
