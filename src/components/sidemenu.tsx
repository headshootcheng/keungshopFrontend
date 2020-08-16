import React from "react";
import "../styles/tailwind.css";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ShopIcon from "@material-ui/icons/Shop";
import { useHistory } from "react-router-dom";
const SideMenu: React.FC<{ isMenuOpen: boolean; onCloseMenu: () => void }> = ({
  isMenuOpen,
  onCloseMenu,
}) => {
  const history = useHistory();
  const list = (onCloseMenu: () => void) => {
    return (
      <div
        onKeyDown={onCloseMenu}
        className=" flex flex-col  w-48 md:w-64 pt-4 "
      >
        <ListItem
          button
          key="Home"
          className="mt-6"
          onClick={() => history.push("/dashboard")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          key="Game"
          className="mt-6"
          onClick={() => history.push("/dashboard?tid=1")}
        >
          <ListItemIcon>
            <ShopIcon />
          </ListItemIcon>
          <ListItemText primary="Game" />
        </ListItem>
      </div>
    );
  };

  return (
    <Drawer anchor="left" open={isMenuOpen} onClose={onCloseMenu}>
      {list(onCloseMenu)}
    </Drawer>
  );
};

export default SideMenu;
