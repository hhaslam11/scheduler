import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  //reducer actions
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SUBTRACT = "SUBTRACT";
  const ADD = "ADD";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
      case SET_INTERVIEW:

        //get current day object, copy to newDay
        let currentDay;
        let currentDayIndex;

        for (let i = 0; i < state.days.length; i++) {
          if (state.day === state.days[i].name) {
            currentDay = {...state.days[i]};
            currentDayIndex = i;
          }
        }

        //replace spots with new value
        if (action.updateDays === ADD) {
          currentDay.spots++;
        } else {
          currentDay.spots--;
        }

        //create new days object with newDay
        const newDays = [...state.days];
        newDays[currentDayIndex] = currentDay;

        return { ...state, appointments: action.value, days: newDays}
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});

  //Changes day in the state || "Monday", "Tuesday", etc..
  const setDay = day => dispatch({ type: SET_DAY, value: day});

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments, updateDays: SUBTRACT}));
  }  

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, value: appointments, updateDays: ADD});
      })
      .catch((e) => console.log('error: ', e));
    
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

        dispatch({type: SET_APPLICATION_DATA, days, appointments, interviewers});
      });
  }, []);

  return  {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}