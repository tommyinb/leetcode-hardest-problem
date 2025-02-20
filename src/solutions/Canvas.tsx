import { useMemo } from "react";
import { Question } from "../questions/question";
import { explore } from "../travels/explore";
import { StepType } from "../travels/stepType";
import { Travel } from "../travels/Travel";
import "./Canvas.css";
import { Drawing } from "./Drawing";
import { getCovering } from "./getCovering";

export function Canvas({ question, expected, size }: Props) {
  const scale = size / Math.max(question.area.width, question.area.height);

  const covering = useMemo(() => getCovering(question), [question]);
  const output = useMemo(() => explore(question), [question]);
  const answer = useMemo(
    () =>
      covering
        ? false
        : output.some((step) => step.type === StepType.CornerEnd),
    [covering, output]
  );

  return (
    <div
      className="solutions-Canvas"
      style={{
        width: question.area.width * scale,
        height: question.area.height * scale,
      }}
    >
      <Drawing question={question} scale={scale} />

      {covering ? (
        <div
          className="covering"
          style={{
            left: (covering.x - covering.radius) * scale,
            top: (covering.y - covering.radius) * scale,
            width: covering.radius * 2 * scale,
            height: covering.radius * 2 * scale,
          }}
        />
      ) : (
        <Travel path={output} question={question} scale={scale} />
      )}

      <div className={`result ${answer === expected ? "correct" : ""}`}>
        {expected ? "Reachable" : "Unreachable"}
        {answer === expected ? "✔️" : "✖️"}
      </div>
    </div>
  );
}

interface Props {
  question: Question;
  expected: boolean;
  size: number;
}
