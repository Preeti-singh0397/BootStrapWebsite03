import React from "react";
import "./BuildControls.css";

import BulidControl from "./BulidControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheesse", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className="BuildControls">
    <p>
      Current Price:<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BulidControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientDeleted(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className="OrderButton"
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW!!!" : "SIGNIN TO ORDER"}
    </button>
  </div>
);

export default buildControls;
