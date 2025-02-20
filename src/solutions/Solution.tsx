import { Question } from "../questions/question";
import { Canvas } from "./Canvas";
import "./Solution.css";

export function Solution({ question }: Props) {
  return (
    <div className="solutions-Solution">
      <Canvas question={question} />
    </div>
  );
}

interface Props {
  question: Question;
  expected: boolean;
}
