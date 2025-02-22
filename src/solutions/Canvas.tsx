import { useMemo } from "react";
import { explore } from "../explores/explore";
import { Question } from "../questions/question";
import "./Canvas.css";
import { Drawing } from "./Drawing";

export function Canvas({ question, expected, size }: Props) {
  const scale = size / Math.max(question.area.width, question.area.height);

  const path = useMemo(() => explore(question), [question]);

  return (
    <div
      className="solutions-Canvas"
      style={{
        width: question.area.width * scale,
        height: question.area.height * scale,
      }}
    >
      <Drawing question={question} scale={scale} />

      <div className={`result ${!path === expected ? "correct" : ""}`}>
        {expected ? "Reachable" : "Unreachable"}
        {!path === expected ? "✔️" : "✖️"}
      </div>
    </div>
  );
}

interface Props {
  question: Question;
  expected: boolean;
  size: number;
}
