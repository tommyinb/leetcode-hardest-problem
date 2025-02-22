import { Border } from "./Border";
import { Chain } from "./Chain";
import { Code } from "./Code";
import { Covering } from "./Covering";
import { One } from "./One";

export function Explore() {
  return (
    <div>
      <Code
        text={`function explore(question: Question): Path | undefined {
  const startPaths: Path[] = [];
  const endPaths: Path[] = [];

  const currentCircles: Circle[] = [];

  for (const circle of question.circles) {`}
      />

      <Covering />

      <Code
        text={`
`}
      />

      <Border />

      <Code
        text={`
    if (start && end) {
      return { circles: [circle] };
    }

    if (!start && !end) {
      currentCircles.push(circle);
    }
  }

`}
      />

      <One />

      <Code
        text={`
`}
      />

      <Chain />

      <Code
        text={`
  return undefined;
}`}
      />
    </div>
  );
}
