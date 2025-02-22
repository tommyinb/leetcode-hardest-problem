import { Code } from "./Code";
import { Intersect } from "./Intersect";
import { Overflow } from "./Overflow";

export function Detail() {
  return (
    <div>
      <Intersect />

      <Code
        text={`
`}
      />

      <Overflow />
    </div>
  );
}
