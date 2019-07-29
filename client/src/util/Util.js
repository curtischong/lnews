import moment from 'moment'

function toTimeZone(time) {
  console.log(time);
  return moment.utc(time).local().format()//.toISOString()
}

function toPrettyDate(time){
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return time.toLocaleDateString("en-US", options)
}

export{
  toTimeZone,
  toPrettyDate
}