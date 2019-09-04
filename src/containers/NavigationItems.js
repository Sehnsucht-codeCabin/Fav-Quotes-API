/* eslint-disable react/jsx-filename-extension */
import React, { Link } from "react";
import './NavigationItems.scss';
import NavigationItem from "./NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/" exact>Home</NavigationItem>
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Login</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};
export default navigationItems;