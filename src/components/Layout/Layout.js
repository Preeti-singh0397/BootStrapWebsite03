import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary"
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    SideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        return (
            <Auxiliary >
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    closed={this.SideDrawerCloseHandler}
                    open={this.state.showSideDrawer}
                />
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }

}

export default Layout;