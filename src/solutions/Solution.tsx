import { Question } from "../questions/question";
import { Canvas } from "./Canvas";
import "./Solution.css";

export function Solution({ question, expected }: Props) {
  return (
    <div className="solutions-Solution">
      <Canvas question={question} expected={expected} size={200} />
    </div>
  );
}

interface Props {
  question: Question;
  expected: boolean;
}
