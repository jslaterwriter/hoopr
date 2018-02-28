var month = document.getElementById("new-date-month"),
    day   = document.getElementById("new-date-day"),
    year  = document.getElementById("new-date-year"),
    form = document.getElementById("new-game");

//today === minimum date
    var today = new Date(),
        dd = Number(today.getDate()),
        mm = Number(today.getMonth()),
        yy = Number(today.getFullYear());
        year.setAttribute("min", yy);
    
    form.onchange = function(){
        if(yy === Number(year.value)){
            month.setAttribute("min", mm);
            day.setAttribute("min", dd);
        } else { 
            month.setAttribute("min", 1);
            day.setAttribute("min", 1);
        }
    };
//month maximum day
month.onchange = function(){
    var monthValue = Number(month.value);
    if(monthValue === 2){
        day.setAttribute("max", 28);
    } else if(monthValue === 4 || monthValue === 6 || monthValue === 9 || monthValue === 11){
        day.setAttribute("max", 30);
    } else {
        day.setAttribute("max", 31);
    }    
};


