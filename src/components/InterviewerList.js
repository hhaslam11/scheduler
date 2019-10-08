import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

/**
 * @param {object} props {interviewers (object from top level -application- state), value (interviewer id) onChange (function to setInterviewer)} 
 */
export default function InterviewerList(props) {
  //verify corrent prop value types
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        value={props.value === interviewer.id /* checks if */}
        onChange={event => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )  

}