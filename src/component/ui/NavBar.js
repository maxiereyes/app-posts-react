import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./navbar.css";

export const NavBar = () => {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    history.replace("/login");

    dispatch({
      type: types.logout,
      payload: {
        access_token: "",
        userId: "",
      },
    });
  };

  return (
    <nav className="navbar  ">
      <div className="container">
        <Link to="/" className="navbar-brand text-light">
          Posts App
        </Link>
        <div className="ml-auto">
          <NavLink className="text-light" exact to="/posts/add">
            <IconButton variante="filled" color="inherit">
              <PostAddIcon />
            </IconButton>
          </NavLink>
          <NavLink className="text-light" exact to="/posts/search">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </NavLink>

          <IconButton
            color="inherit"
            className="text-light"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};
