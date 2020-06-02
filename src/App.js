import React, { Component } from 'react';
import CheckOut from "./containers/CheckOut/CheckOut"
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component {


  render() {
    return (
      <div>
        <Layout >
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={CheckOut} />
          </Switch>
        </Layout>

      </div>
    );
  }

}

export default App;
