import React from "react";
import Routes from "./routes";
import background from "./Assets/background.png"

export default function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Routes />
    </div>
  );
}
