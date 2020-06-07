import * as actionType from "../actions/actionsTyps";
import { updateObject } from "../utility";
const InitialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.2,
  meat: 1.3
};
const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false
  });
};

const fetchIngredientsFail = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredients(state, action);

    case actionType.REMOVE_INGREDIENT:
      return removeIngredients(state, action);

    case actionType.SET_INGREDIENT:
      return setIngredients(state, action);

    case actionType.FETCH_INGREDIENT_FAIL:
      return fetchIngredientsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
