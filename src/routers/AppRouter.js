import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { LoginScreen } from "../component/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthContext } from "../auth/AuthContext";
import { PublicRoutes } from "./PublicRoutes";
import { SignUpScreen } from "../component/signup/SignUpScreen";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <PublicRoutes
          exact
          path="/login"
          component={LoginScreen}
          isLogged={user.logged}
        />
        <PublicRoutes
          exact
          path="/signup"
          component={SignUpScreen}
          isLogged={user.logged}
        />
        <PrivateRoutes
          path="/"
          component={DashboardRoutes}
          isLogged={user.logged}
        />
      </Switch>
    </Router>
  );
};
