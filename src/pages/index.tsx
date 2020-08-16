import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";

const Index: React.FC<{}> = ({}) => {
  return (
    <div
      className=" flex-1"
      style={{
        backgroundImage: `url(${require("../images/dashboardBg.jpg")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></div>
  );
};
export default Index;
