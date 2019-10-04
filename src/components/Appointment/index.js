import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import "./styles.scss";

//modes
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

/**
 * @param {object} props {key, id, time, interview (object), bookInterview (function)}
 */
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /**
   * Save an appointment
   * @param {string} name student name
   * @param {number} interviewer interviewer id
   */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SHOW);

    //TODO the bookInterview function currently accepts an appointments ID, while
    //this call is passing in the interviewer Id. i think something is wrong here. :/
    props.bookInterview(interviewer, interview);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer /* {id, name, avater} */}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
    </article>
  );
}