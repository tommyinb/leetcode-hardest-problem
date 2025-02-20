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
              area: { width: 283239, height: 179963 },
              circles: [
                { x: 248866, y: 18768, radius: 15302 },
                { x: 118187, y: 107493, radius: 44573 },
                { x: 108498, y: 120943, radius: 43664 },
                { x: 153333, y: 112887, radius: 34787 },
                { x: 177345, y: 57622, radius: 13897 },
                { x: 110613, y: 49502, radius: 49502 },
                { x: 55969, y: 48432, radius: 13190 },
                { x: 77476, y: 58814, radius: 35515 },
                { x: 143118, y: 79684, radius: 31 },
              ],
            }),
            []
          )}
          expected={true}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 13, height: 13 },
              circles: [
                { x: 10, y: 5, radius: 3 },
                { x: 1, y: 2, radius: 1 },
                { x: 3, y: 8, radius: 1 },
                { x: 2, y: 12, radius: 1 },
                { x: 10, y: 1, radius: 1 },
                { x: 7, y: 4, radius: 1 },
                { x: 4, y: 5, radius: 3 },
              ],
            }),
            []
          )}
          expected={true}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 6, height: 13 },
              circles: [
                { x: 1, y: 5, radius: 1 },
                { x: 1, y: 5, radius: 1 },
                { x: 5, y: 7, radius: 1 },
                { x: 3, y: 7, radius: 2 },
                { x: 5, y: 5, radius: 1 },
                { x: 2, y: 10, radius: 1 },
                { x: 2, y: 1, radius: 1 },
              ],
            }),
            []
          )}
          expected={false}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 5, height: 9 },
              circles: [
                { x: 4, y: 7, radius: 1 },
                { x: 2, y: 1, radius: 1 },
                { x: 4, y: 7, radius: 1 },
                { x: 3, y: 7, radius: 1 },
                { x: 4, y: 1, radius: 1 },
                { x: 4, y: 7, radius: 1 },
                { x: 1, y: 5, radius: 1 },
              ],
            }),
            []
          )}
          expected={true}
        />

        <Solution
          question={useMemo(
            () => ({
              area: { width: 5, height: 8 },
              circles: [{ x: 4, y: 7, radius: 1 }],
            }),
            []
          )}
          expected={false}
        />

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
