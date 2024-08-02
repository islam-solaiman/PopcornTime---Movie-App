import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import App1 from "./App1";
import StarRating from "./starRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App1 />
    {/* <StarRating
      maxRating={5}
      defaultRating={3}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
  </React.StrictMode>
);
