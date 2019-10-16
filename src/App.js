import React, { useState } from "react";
import Container from "./components/Container";

function App() {
  const [activeTab, setActiveTab] = useState("0");

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
