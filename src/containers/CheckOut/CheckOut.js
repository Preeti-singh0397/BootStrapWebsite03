import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route, Redirect } from "react-router-dom";
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
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
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
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(CheckOut);
