/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import './NavigationItems.scss';
import NavigationItem from "./NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/" exact>Home</NavigationItem>
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Login</NavigationItem>
      ) : (
        <React.Fragment>
          <NavigationItem link="/logout">My Fav Quotes</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </React.Fragment>
        )}
    </ul>
  );
};
export default navigationItems;