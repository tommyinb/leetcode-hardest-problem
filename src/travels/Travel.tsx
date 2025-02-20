import { Question } from "../questions/question";
import { Step } from "./step";
import { StepType } from "./stepType";
import "./Travel.css";

export function Travel({ path, question, scale }: Props) {
  return (
    <>
      {path.map((step, i) => {
        switch (step.type) {
          case StepType.RightLine:
            return (
              <div
                key={i}
                className={`travels-Travel ${step.type}`}
                style={{ left: step.x * scale }}
              >
                {i}
              </div>
            );

          case StepType.DownLine:
            return (
              <div
                key={i}
                className={`travels-Travel ${step.type}`}
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
                className={`travels-Travel ${step.type}`}
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
                className={`travels-Travel ${step.type}`}
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
                className={`travels-Travel ${step.type}`}
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
                className={`travels-Travel ${step.type}`}
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
    </>
  );
}

interface Props {
  path: Step[];
  question: Question;
  scale: number;
}
