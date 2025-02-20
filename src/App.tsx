import "./App.css";
import { Solutions } from "./solutions/Solutions";
import { Explain } from "./tutorials/Explain";
import { Solution } from "./tutorials/Solution";

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          <a
            href="https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable/description/"
            target="_blank"
          >
            Check if the Rectangle Corner is Reachable
          </a>
        </h1>
        <h3>LeetCode Hardest Problem</h3>
      </header>

      <Explain />

      <Solutions className="solutions" />

      <Solution />

      <footer>Happy coding! 😊</footer>
    </div>
  );
}

export default App;
