import { useMemo } from "react";
import { Question } from "../questions/question";
import { explore } from "./explore";
import { StepType } from "./stepType";
import "./Travel.css";

export function Travel({ question, scale }: Props) {
  const path = useMemo(() => explore(question), [question]);

  return (
    <div className="travels-Travel">
      {path.map((step, i) => {
        switch (step.type) {
          case StepType.RightLine:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{ left: step.x * scale }}
              >
                {i}
              </div>
            );

          case StepType.DownLine:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{
                  left: question.area.width * scale,
                  top: step.y * scale,
                }}
              >
                {i}
              </div>
            );

          case StepType.ArcStep:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{
                  left: step.x * scale,
                  top: step.y * scale,
                }}
              >
                {i}
              </div>
            );

          case StepType.CornerEnd:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{
                  left: question.area.width * scale,
                  top: question.area.height * scale,
                }}
              >
                {i}
              </div>
            );

          case StepType.LeftEnd:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{
                  left: 0,
                  top: step.y * scale,
                }}
              >
                {i}
              </div>
            );

          case StepType.BottomEnd:
            return (
              <div
                key={i}
                className={`step ${step.type}`}
                style={{
                  left: step.x * scale,
                  top: question.area.height * scale,
                }}
              >
                {i}
              </div>
            );

          default:
            return undefined;
        }
      })}
    </div>
  );
}

interface Props {
  question: Question;
  scale: number;
}
