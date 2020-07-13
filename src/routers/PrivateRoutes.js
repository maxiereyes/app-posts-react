import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoutes = ({ isLogged, component: Component, ...rest }) => {
  localStorage.setItem(
    "lastPathName",
    `${rest.location.pathname}${rest.location.search}`
  );

  return (
    <Route
      {...rest}
      component={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoutes.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
