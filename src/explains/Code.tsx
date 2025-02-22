import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Code.css";

export function Code({ text }: Props) {
  return (
    <div className="explains-Code">
      <SyntaxHighlighter language="typescript" style={coy}>
        {text}
      </SyntaxHighlighter>
    </div>
  );
}

interface Props {
  text: string;
}
