import React, { useState } from "react";

import InterviewerList from "../InterviewerList";
import Button from "../Button";
import "./styles.scss";

/**
 * @param {object} props {interviewers (object), onSave (function), onCancel (function)}
 */
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null); //TODO is this an object or id? interviewer list depending on it to be an id, but that might not be correct
  
  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">

        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={name || ""}
            onInput={event => setName(event.target.value) /*TODO is re-rendering the form each time a letter is typed bad practice? */}
          />
        </form>

        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>

  );
}