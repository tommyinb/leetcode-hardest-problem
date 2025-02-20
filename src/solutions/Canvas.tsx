import { useMemo } from "react";
import { Question } from "../questions/question";
import { explore } from "../travels/explore";
import { StepType } from "../travels/stepType";
import { Travel } from "../travels/Travel";
import "./Canvas.css";
import { getCovering } from "./getCovering";

export function Canvas({ question, expected }: Props) {
  const width = Math.max(
    question.area.width,
    ...question.circles.map((circle) => circle.x)
  );
  const height = Math.max(
    question.area.height,
    ...question.circles.map((circle) => circle.y)
  );

  const scale = 300 / Math.max(width, height);

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
        width: width * scale,
        height: height * scale,
      }}
    >
      <div
        className="area"
        style={{
          width: question.area.width * scale,
          height: question.area.height * scale,
        }}
      />

      {question.circles.map((circle, index) => (
        <div
          key={index}
          className={`circle ${covering === circle ? "covering" : ""}`}
          style={{
            left: (circle.x - circle.radius) * scale,
            top: (circle.y - circle.radius) * scale,
            width: circle.radius * 2 * scale,
            height: circle.radius * 2 * scale,
          }}
        />
      ))}

      {!covering && <Travel path={output} question={question} scale={scale} />}

      <div className={`result ${answer === expected ? "correct" : ""}`}>
        {answer === expected ? "CORRECT" : "WRONG"}
      </div>
    </div>
  );
}

interface Props {
  question: Question;
  expected: boolean;
}
