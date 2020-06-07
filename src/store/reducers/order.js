import * as actionType from "../actions/actionsTyps";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  });
};
const PurchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const FetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};
const FetchIngredientFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const FetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionType.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionType.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionType.PURCHASE_BURGER_FAIL:
      return PurchaseBurgerFail(state, action);
    case actionType.FETCH_ORDERS_SUCCESS:
      return FetchOrdersSuccess(state, action);
    case actionType.FETCH_INGREDIENT_FAIL:
      return FetchIngredientFail(state, action);
    case actionType.FETCH_ORDERS_START:
      return FetchOrdersStart(state, action);

    default:
      return state;
  }
};

export default reducer;
