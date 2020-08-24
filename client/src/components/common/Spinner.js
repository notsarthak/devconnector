import React from "react";
import spinner from "./spinner.gif";

export default function () {
  return (
    <div>
      <img src={spinner} alt="Loading..." style={{ width: "200px", display:"block", margin:"auto"  }} />
    </div>
  );
}
