import { PropsWithChildren } from "react";
import "./ExplainPath.css";

export function ExplainPath({ width, height, children }: Props) {
  return (
    <svg className="tutorials-ExplainPath" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      {children}
    </svg>
  );
}

interface Props extends PropsWithChildren {
  width: number;
  height: number;
}
