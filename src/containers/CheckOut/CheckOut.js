import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class CheckOut extends Component {
  CheckOutCancelHandler = () => {
    this.props.history.goBack();
  };
  CheckOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.props.ing}
          checkoutCancel={this.CheckOutCancelHandler}
          checkoutContinue={this.CheckOutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ing: state.ingredients
  };
};

export default connect(mapStateToProps)(CheckOut);
