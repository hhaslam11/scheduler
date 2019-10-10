import React from "react";
import classnames from "classnames";

//styles
import "./InterviewerListItem.scss";

/**
 * @param {object} props {id, name, avatar, value (boolean), onChange (function to change interviewer)}
 */
export default function InterviewerListItem(props) {

  const interviewerClass = classnames("interviewers_item", {
    "interviewers__item--selected": props.value
  });
  
  return (
    <li 
      className={interviewerClass}
      onClick={props.onChange}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.value && props.name}
    </li>
  )
}