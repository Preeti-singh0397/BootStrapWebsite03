import React, { Component } from 'react';
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.2,
    meat: 1.3
}


class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount() {
        console.log(this.props)
        axios.get("https://react-my-burger-150c8.firebaseio.com/ingredients.json")
            .then(response => { this.setState({ ingredients: response.data }) })
            .catch(error => { this.setState({ error: true }) })
    }

    UpdatedPurchaseableState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({ purchaseable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const UpdatedCount = oldCount + 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        }
        UpdatedIngredient[type] = UpdatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: UpdatedIngredient })
        this.UpdatedPurchaseableState(UpdatedIngredient)

    }
    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const UpdatedCount = oldCount - 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        }
        UpdatedIngredient[type] = UpdatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: UpdatedIngredient })
        this.UpdatedPurchaseableState(UpdatedIngredient)
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice)
        const queryString = queryParams.join("&")
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;


        let burger = this.state.error ? <p>ingredient Canot be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientDeleted={this.deleteIngredientHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}

                    />
                </Auxiliary>)
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                price={this.state.totalPrice}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }

}

export default WithErrorHandler(BurgerBuilder, axios);
