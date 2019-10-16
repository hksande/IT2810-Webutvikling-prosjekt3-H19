import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import List from "./List";

const listContent = [
  { header: "Rødvin", description: "Rund og mild", price: 179 },
  { header: "Hvitvin", description: "Søt", price: 152 },
  { header: "Øl", description: "En god juleøl", price: 89 },
  { header: "Cider", description: "Skikkelig digg", price: 79 },
  { header: "Vodka", description: "Nam nam", price: 349 }
];

export default function PaperSheet() {
  const [activeTab, setActiveTab] = useState("0");

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  return (
    <div>
      <Paper className="paper">
        <Tabs changeActiveTab={changeActiveTab} active={activeTab} />
        <List content={listContent} />
      </Paper>
    </div>
  );
}
