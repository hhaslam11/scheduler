import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Application";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });  

  const setDay = day => setState(prev => {
    return ({ ...prev, day})
  });
  
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
      .then(res => {
        const days = res[0].data;
        const appointments = res[1].data;

        setState(prev => {
          return {
            ...prev,
            days,
            appointments
          }
        });

      });
  }, []);

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
          getAppointmentsForDay(state, state.day).map(appointment => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            );
          })
        }
        <Appointment key="last" time="5pm"/>
        </>
      </section>
    </main>
  );
}
