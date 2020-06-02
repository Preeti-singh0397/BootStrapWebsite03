import React from "react";
import "./NavigationItems.css"
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem"

const navigationItems = () => (
    <ul className="Navigation">
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>

);

export default navigationItems