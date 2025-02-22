import "./App.css";
import { Detail } from "./explains/Detail";
import { Explore } from "./explains/Explore";
import { Solution } from "./explains/Solution";
import { Solutions } from "./solutions/Solutions";

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

      <Explore />

      <Solution />

      <Solutions className="solutions" />

      <Detail />

      <Solution />

      <footer>Happy coding! 😊</footer>
    </div>
  );
}

export default App;
