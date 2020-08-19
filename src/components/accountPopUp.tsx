import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
const AccountPopUp: React.FC<{
  anchorEl: any;
  menuId: string;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
}> = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
  const history = useHistory();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Reset Password</MenuItem>
      <MenuItem onClick={() => history.push("/cardsave")}>
        Save Credit Card
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
};

export default AccountPopUp;
