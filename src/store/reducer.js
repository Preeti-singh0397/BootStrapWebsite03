import * as actionType from "./actions";

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.2,
  meat: 1.3
};

const InitialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };

    default:
      return state;
  }
};

export default reducer;