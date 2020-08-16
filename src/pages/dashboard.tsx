import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import axios from "axios";
import Topbar from "../components/topbar";
import SideMenu from "../components/sidemenu";
import { useLocation, useParams } from "react-router-dom";
const Dashboard = () => {
  const [isMenuOpen, setMenuOStatus] = useState<boolean>(false);
  const { search } = useLocation();
  const qs = require("query-string");
  const { tid } = qs.parse(search);

  const onPressMenu = () => {
    setMenuOStatus(!isMenuOpen);
  };
  // if (tid) {
  //   console.log(tid);
  // }

  const onCloseMenu = () => {
    setMenuOStatus(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar username="test" onPressMenu={onPressMenu} />
      <div className=" flex-1 flex flex-row">
        <SideMenu isMenuOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
        <div className=" bg-black flex-1"></div>
      </div>
    </div>
  );
};

export default Dashboard;
