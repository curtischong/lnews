import moment from 'moment'

function toTimeZone(time) {
  console.log(time);
  return moment.utc(time).local().format()//.toISOString()
}

export{
  toTimeZone
}