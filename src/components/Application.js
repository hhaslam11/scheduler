import React from "react";

import "components/Application.scss";
import "components/Application";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        
        {/* Renders the days list, which is the sidebar     */}
        {/* days   - array of day objects                   */}
        {/* day    - a string; "Monday", for example        */}
        {/* setDay - Function that changes the day in state */}
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <>
        {

          //get array of appointment objects for the given day ("Monday", for example)
          getAppointmentsForDay(state, state.day).map(appointment => {

            //get inteverview object (that contains the entire interviewer object
            //instead of just the interviewer id)
            //{ student: "Archie Cohen", interviewer: {id, name, avatar} }
            const interview = getInterview(state, appointment.interview);
            const interviewers = getInterviewersForDay(state, state.day);
            
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewers}
                bookInterview={bookInterview /* function to book interview */}
                onDelete={cancelInterview}
              />
            );
          })
        }
        <Appointment key="last" time="5pm"/>
        </>
      </section>
    </main>
  );
}