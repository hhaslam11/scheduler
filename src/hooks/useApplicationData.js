import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';


/*
* 
* day: string | the day that is selected.
* days: Array of objects =>
*    {
*     id: 1,
*     name: 'Monday',
*     appointments: [1,2,3,4,5],
*     interviewers: [2,3,5,7,10],
*     spots: 3
*    }
* appointments: object of objects => 
*    {
*      1: {
*        id: 1,
*        time: '12pm',
*        interview: { student: 'Archie Cohen', interviewer: 10 }
*        }
*      ...
*    }
* interviewers: object of objects => 
*    {
*      1: {
*        id: 1,
*        name: 'Sylvia Palmer',
*        avatar: 'https://i.imgur.com/LpaY82x.png'
*        }
*    }
*/

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {day: 'Monday', days: [], appointments: {}, interviewers: {}});

  //Changes day in the state || 'Monday', 'Tuesday', etc..
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
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments}));
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
        dispatch({ type: SET_INTERVIEW, value: appointments});
      });
    
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