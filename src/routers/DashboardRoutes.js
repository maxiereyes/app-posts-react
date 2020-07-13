import React from "react";
import { NavBar } from "../component/ui/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { PostsScreen } from "../component/posts/PostsScreen";
import { PostsAdd } from "../component/posts/PostsAdd";
import { PostsSearch } from "../component/posts/PostsSearch";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />

      <div>
        <Switch>
          <Route exact path="/posts" component={PostsScreen} />
          <Route exact path="/posts/search" component={PostsSearch} />
          <Route exact path="/posts/add" component={PostsAdd} />
          <Redirect to="/posts" />
        </Switch>
      </div>
    </>
  );
};
