import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";

//modes
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

/**
 * @param {object} props {key, id, time, interview (object), bookInterview (function)}
 * interview = { student: "Archie Cohen", interviewer: {id, name, avatar} }
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
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(() => {transition(ERROR_SAVE, true)});
  }

  function onDelete() {
    transition(DELETING, true);

    props.onDelete(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {transition(ERROR_DELETE, true)});
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === DELETING && <Status message='Deleting...' />}
      {mode === ERROR_SAVE && <Error message='Can not save. Please try again.' onClose={back} />}
      {mode === ERROR_DELETE && <Error message='Can not delete. Please try again.' onClose={back} />}
      {mode === EDIT && 
        <Form
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you want to delete this appointment?'
          onCancel={back}
          onConfirm={onDelete}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer /* {id, name, avater} */}
          onEdit={() => transition(EDIT)}
          onDelete={() => {transition(CONFIRM)}}
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