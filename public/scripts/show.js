var games = document.getElementsByClassName("game-wrapper");

//hide past games
var checkDate = function(game){
for(var i = 0; i < game.length; i++){
        //define today's date
        var today = new Date(),
                currentDay = today.getDate(),
                currentMonth = today.getMonth(),
                currentYear = today.getFullYear();
        //define the scheduled date
        var listedMonth = document.getElementsByClassName("month"),
            listedDay = document.getElementsByClassName("day"),
            listedYear = document.getElementsByClassName("year");
        //compare dates from year to month to day
        if(currentYear > listedYear[i].innerHTML){
            game[i].style.display = "none";
        } else if (currentMonth > listedMonth[i].innerHTML){
            game[i].style.display = "none";
        } else if (currentDay > listedDay[i].innerHTML){
            game[i].style.display = "none";
        } else {
            game[i].style.display = "block";
        }  
    }
};
checkDate(games);
//add zeros to minutes
var startMinute = document.getElementsByClassName("start-minute"),
    endMinute = document.getElementsByClassName("end-minute");

var fixMinutes = function(minutes){
    for(var i = 0; i < minutes.length; i++){
        if(Number(minutes[i].innerHTML) < 10){
            var newMinutes = "0" + Number(minutes[i].innerHTML);
            console.log(newMinutes);
            minutes[i].innerHTML = newMinutes;
        } 
    }
};

fixMinutes(startMinute);
fixMinutes(endMinute);



