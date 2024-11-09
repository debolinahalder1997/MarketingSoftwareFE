import React from 'react';
import moment from 'moment';
function CurrentDateValidation(Inputdate) {
    let valdate = moment(Inputdate);
    let currentdate = moment();
    let isCurrent = false;
    if (currentdate.isSame(valdate,'days'))
    {
        isCurrent = true;
    }
    else if (currentdate.isAfter(valdate, "days")) {
        isCurrent = true;
    } else if (currentdate.isBefore(valdate, "days")) {
        isCurrent=false
    }
    return isCurrent; 
}

export default CurrentDateValidation