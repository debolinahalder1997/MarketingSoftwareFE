import React from 'react'
import moment from 'moment'
const  DateDiffChecker=(StartDate,EndDate) =>{
    let sdate = moment(StartDate);
    let edate = moment(EndDate);

    let isBig = edate.isAfter(sdate, "days");
    console.log(isBig);
    
    return isBig;
}
export default DateDiffChecker;
