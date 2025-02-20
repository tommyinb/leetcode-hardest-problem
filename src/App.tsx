import { useMemo } from "react";
import "./App.css";
import { Solution } from "./solutions/Solution";

function App() {
  return (
    <div className="App">
      <h1>Check if the Rectangle Corner is Reachable</h1>
      <h3>LeetCode Hardest Problem</h3>

      <div className="solutions">
        <Solution
          question={useMemo(
            () => ({
              area: { width: 3, height: 4 },
              circles: [{ x: 2, y: 1, radius: 1 }],
            }),
            []
          )}
          expected={true}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 3, height: 3 },
              circles: [{ x: 1, y: 1, radius: 2 }],
            }),
            []
          )}
          expected={false}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 3, height: 3 },
              circles: [
                { x: 2, y: 1, radius: 1 },
                { x: 1, y: 2, radius: 1 },
              ],
            }),
            []
          )}
          expected={false}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 4, height: 4 },
              circles: [{ x: 5, y: 5, radius: 1 }],
            }),
            []
          )}
          expected={true}
        />
      </div>
    </div>
  );
}

export default App;
