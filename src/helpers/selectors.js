export function getAppointmentsForDay(state, day) {
  
  //Find the right day object, sets to matchingDay
  let matchingDay;
  state.days.forEach(dayObject => {
    if (dayObject.name === day) matchingDay = dayObject;
  });
  if (!matchingDay) return [];

  //Get array of appointments
  const appointmentsArr   = [];
  const { appointments } = state;
  for (const id of matchingDay.appointments) {
    if(appointments[id]) appointmentsArr.push(appointments[id]);
  }
  if (!appointmentsArr.length) return [];

  return appointmentsArr;
}

/**
 * @param {state} state entire state object
 * @param {object} interview interview object that will only have an interviewer id
 * @return {object} inteview object with full interviewer object (id, name, avatar)
 */
export function getInterview(state, interview) {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {
  
  //Find the right day object, sets to matchingDay
  let matchingDay;
  state.days.forEach(dayObject => {
    if (dayObject.name === day) matchingDay = dayObject;
  });
  if (!matchingDay) return [];

  //Get array of interviewers
  const interviewersArr   = [];
  const { interviewers } = state;
  for (const id of matchingDay.interviewers) {
    if(interviewers[id]) interviewersArr.push(interviewers[id]);
  }
  if (!interviewersArr.length) return [];

  return interviewersArr;
}

/*
{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1
  }
}

{
  "student": "Lydia Miller-Jones",
  "interviewer": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/