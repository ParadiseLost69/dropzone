import React from "react";
import "./progressBar.css";
export default function ProgressBar({ width }) {
  const barColor = width >= 90 ? "green" : "#069";

  return (
    <div
      className="progress-bar"
      data-label={width >= 90 ? "Completed" : "Loading..."}
      style={{ "--width": width, "--bar-color": barColor }}
    >
      <h1></h1>
    </div>
  );
}
