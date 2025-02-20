import { useMemo } from "react";
import { Drawing } from "../solutions/Drawing";
import "./Exception.css";
import { ExplainPath } from "./ExplainPath";

export function Exception() {
  return (
    <div className="tutorials-Exception">
      <div className="pictured">
        <div className="message">
          <div className="tricky">
            <div>But geometry is tricky. 🤯</div>

            <div className="zoom" style={{ width: 200, height: 200 }}>
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
                  scale={70}
                />
              </div>
            </div>

            <div>← Zoom in: 100x</div>
          </div>
        </div>

        <div className="picture" style={{ width: 200, height: 200 }}>
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

          <ExplainPath width={205} height={205}>
            <path
              d="M 10,5
              L 200,5
              L 5,200
              L 5,10"
            />
          </ExplainPath>
        </div>
      </div>
    </div>
  );
}
