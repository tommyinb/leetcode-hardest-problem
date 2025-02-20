import { Question } from "../questions/question";
import "./Drawing.css";

export function Drawing({ question, scale }: Props) {
  return (
    <>
      <div
        className="solutions-Drawing area"
        style={{
          width: question.area.width * scale,
          height: question.area.height * scale,
        }}
      />

      {question.circles.map((circle, index) => (
        <div
          key={index}
          className="solutions-Drawing circle"
          style={{
            left: (circle.x - circle.radius) * scale,
            top: (circle.y - circle.radius) * scale,
            width: circle.radius * 2 * scale,
            height: circle.radius * 2 * scale,
          }}
        />
      ))}
    </>
  );
}

interface Props {
  question: Question;
  scale: number;
}
