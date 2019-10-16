import React from "react";


export default function Tab(props){
    function handleTabChange(e) {
        props.changeActiveTab(e.target.name);
      }
      
  return (
    <div className="tab flex-container-tab">
      <button
        className={props.active === "0" ? "active tab" : "tab"}
        name="0"
        onClick={handleTabChange}
      >
          Liste med alkohol
      </button>
      <button
        className={props.active === "1" ? "active tab" : "tab"}
        name="1"
        onClick={handleTabChange}
      >
        Mest kjøpte 
      </button>
    </div>
  );
}