import "./Wrong.css";
import comment from "./wrong-comment.png";
import header from "./wrong-header.png";

export function Wrong() {
  return (
    <a
      className="tutorials-Wrong"
      href="https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable/solutions/5546479/beats-100-union-find-algorithm-c-c-c-java-python3-javascript/"
      target="_blank"
    >
      <img src={header} />
      <img src={comment} />
    </a>
  );
}
