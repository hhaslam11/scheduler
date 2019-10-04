import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Application";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application() {

  /**
   * ~~ State contains the following information ~~
   * 
   * day: string | the day that is selected.
   * days: Array of objects =>
   *    {
   *     id: 1,
   *     name: "Monday",
   *     appointments: [1,2,3,4,5],
   *     interviewers: [2,3,5,7,10],
   *     spots: 3
   *    }
   * appointments: object of objects => 
   *    {
   *      1: {
   *        id: 1,
   *        time: "12pm",
   *        interview: { student: "Archie Cohen", interviewer: 10 }
   *        }
   *      ...
   *    }
   * interviewers: object of objects => 
   *    {
   *      1: {
   *        id: 1,
   *        name: "Sylvia Palmer",
   *        avatar: "https://i.imgur.com/LpaY82x.png"
   *        }
   *    }
   */
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });  

  //Changes day in the state || "Monday", "Tuesday", etc..
  const setDay = day => setState(prev => {
    return ({ ...prev, day});
  });

  /**
   * Create a new appointment and puts it in state
   * @param {number} id state.appointments id
   * @param {object} interview { student: "Archie Cohen", interviewer: 10 }
   *
   */
  function bookInterview(id, interview) {
    
    /*
     * id: state.appointments[id].id
     * time: state.appointments[id].time,
     * interview: interview
     */
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    /*
     * All of state.appointments
     * and replacing appointments[id] with 
     * the new appointment created above
     * that has the new interview
     */
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Replace state with a copy that has the new appointments object in it
    setState(prev => ({...prev, appointments}));
  }  
  
  //This should only run once, when the app is first initialized :)
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(res => {
        // Data structure from the api is the same as described above the useState call
        const days = res[0].data;
        const appointments = res[1].data;
        const interviewers = res[2].data;

        /*
         * Puts the data from the api into state
         *
         * prev probably doesnt need to be used here
         * (this only runs once, and state should be empty at this point anyways)
         * but I'll keep it here anyways, just in case~
         */
        setState(prev => {
          return {
            ...prev,
            days,
            appointments,
            interviewers
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