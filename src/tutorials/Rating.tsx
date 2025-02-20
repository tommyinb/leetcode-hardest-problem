import { useState } from "react";
import "./Rating.css";
import image from "./rating-table.png";

export function Rating() {
  const [active, setActive] = useState(false);

  return (
    <div className="tutorials-Rating">
      <div>
        According to{" "}
        <a href="https://zerotrac.github.io/leetcode_problem_rating">
          zerotrac
        </a>
        's rating table, this is the number one most difficult question in{" "}
        <a href="https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable">
          LeetCode
        </a>{" "}
      </div>

      <div
        className={`table ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <img src={image} />
      </div>
    </div>
  );
}
