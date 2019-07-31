import moment from 'moment'

function toTimeZone(time) {
  let dateObj = moment.isMoment(time) ? time : moment.utc(time)
  return dateObj.local().format()//.toISOString()
}

function toPrettyDate(time){
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return time.toLocaleDateString("en-US", options)
}

export{
  toTimeZone,
  toPrettyDate
}