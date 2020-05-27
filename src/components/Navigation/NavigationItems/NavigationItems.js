import React from "react";
import "./NavigationItems.css"
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem"

const navigationItems = () => (
    <ul className="Navigation">
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">CheckOut</NavigationItem>
    </ul>

);

export default navigationItems