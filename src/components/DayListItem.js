import React from "react";
import classnames from"classnames";

//styles
import "./DayListItem.scss";


function renderSpots(spots) {
  if (spots === 0) return 'no spots remaining';
  if (spots === 1) return '1 spot remaining';
  return `${spots} spots remaining`;
}

export default function DayListItem(props) {
  
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{renderSpots(props.spots)}</h3>
    </li>
  )
}

//==
// export default function Button(props) {
//   const buttonClass = classnames("button", {
//     "button--confirm": props.confirm,
//     "button--danger": props.danger
//   });

//   return (
//     <button
//       className={buttonClass}
//       onClick={props.onClick}
//       disabled={props.disabled}
//     >
//       {props.children}
//     </button>
//   );
// }