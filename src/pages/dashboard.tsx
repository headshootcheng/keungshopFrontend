import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import axios from "axios";
import Topbar from "../components/topbar";
import SideMenu from "../components/sidemenu";
const Dashboard = () => {
  const [isMenuOpen, setMenuOStatus] = useState<boolean>(false);

  const onPressMenu = () => {
    setMenuOStatus(!isMenuOpen);
  };
  return (
    <div className="flex flex-col h-screen">
      <Topbar username="test" onPressMenu={onPressMenu} />
      <div className=" flex-1 flex flex-row">
        {isMenuOpen ? <SideMenu /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
