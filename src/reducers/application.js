//reducer actions
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
export default (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
    case SET_INTERVIEW:

      let matchingDay;
      state.days.forEach(dayObject => {
        if (dayObject.name === state.day) matchingDay = dayObject;
      });
    
      //Get array of appointments
      const appointmentsArr   = [];
      const appointments = action.value;
      for (const id of matchingDay.appointments) {
        if(appointments[id]) appointmentsArr.push(appointments[id]);
      }
      if (!appointmentsArr.length) return [];


      let appointmentCount = 0;
      for (let i of appointmentsArr) {
        if (i.interview) appointmentCount++;
      }
      
      appointmentCount = appointmentsArr.length - appointmentCount;
      let currentDay;
      let currentDayIndex;
         for (let i = 0; i < state.days.length; i++) {
        if (state.day === state.days[i].name) {
          currentDay = {...state.days[i]};
          currentDayIndex = i;
        }
      }
      
      currentDay.spots = appointmentCount;
      const newDays = [...state.days];
      newDays[currentDayIndex] = currentDay;
      return { ...state, appointments: action.value, days: newDays}

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
};