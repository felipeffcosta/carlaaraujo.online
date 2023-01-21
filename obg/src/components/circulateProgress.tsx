import React from "react";
import { render } from "react-dom";

// Import react-circular-progressbar module and styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ChangingProgressProvider from "./ChangingProgressProvider";

const App = () => (
  <div style={{ margin: "0px 100px 0px 100px" }}>

    <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
      {(percentage: any) => (
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      )}
    </ChangingProgressProvider>
  </div>
);

export default App;