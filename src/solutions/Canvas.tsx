import { useMemo } from "react";
import { Question } from "../questions/question";
import { Travel } from "../travels/Travel";
import "./Canvas.css";
import { getCovering } from "./getCovering";

export function Canvas({ question }: Props) {
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

      {!covering && <Travel question={question} scale={scale} />}
    </div>
  );
}

interface Props {
  question: Question;
}
