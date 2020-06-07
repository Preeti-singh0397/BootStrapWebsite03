import * as actionType from "./actionsTyps";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START
  };
};
export const fetchOrder = () => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrders = [];
        for (const key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
