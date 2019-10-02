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