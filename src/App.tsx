import "./App.css";
import { Solutions } from "./solutions/Solutions";
import { Explain } from "./tutorials/Explain";
import { Rating } from "./tutorials/Rating";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Check if the Rectangle Corner is Reachable</h1>
        <h3>LeetCode Hardest Problem</h3>
      </header>

      <Rating />

      <Explain />

      <Solutions className="solutions" />

      <footer>Happy coding! 😊</footer>
    </div>
  );
}

export default App;
