import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as burgerBuilderAction from "../../store/actions/index";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  UpdatedPurchaseableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ing
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>ingredient Canot be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ing) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredients}
            ingredientDeleted={this.props.onRemoveIngredients}
            disabled={disableInfo}
            purchaseable={this.UpdatedPurchaseableState(this.props.ing)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName =>
      dispatch(burgerBuilderAction.addIngredient(ingName)),
    onRemoveIngredients: ingName =>
      dispatch(burgerBuilderAction.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
