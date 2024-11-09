import React from 'react'
import moment from 'moment';
function TimeDiffChecker(StartTime,EndTime) {
  let stime = moment(StartTime,"HH:mm:ss");
  let etime = moment(EndTime, "HH:mm:ss");
  let isBig = etime.isAfter(stime);
  
  console.log(
    isBig,
    StartTime,
    EndTime,
    stime,
    etime
  );
  
  return isBig;
}

export default TimeDiffChecker