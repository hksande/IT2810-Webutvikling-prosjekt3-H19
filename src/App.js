
import React, { useState, useEffect } from "react";
import Tabs from "./components/Tabs";

function App() {

  const [activeTab, setActiveTab] = useState("0");

  
  function changeActiveTab(active) {
    setActiveTab(active);
  }

  return (
    <div className="App">
      <h1>Vinmonopol</h1>
      <Tabs
          changeActiveTab={changeActiveTab}
          active={activeTab}
        />
       
    </div>
  );
}

export default App;
