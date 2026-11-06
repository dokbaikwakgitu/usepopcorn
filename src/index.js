import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import { useState } from "react";
import "./index.css";
import App from "./App";
// import App from "./App-v1";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <div>
        <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
        <p>This movie was rated {movieRating} stars</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating="ss"
      message={["Terrribel", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} />
    <Test /> */}
  </React.StrictMode>,
);
