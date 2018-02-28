var header = document.getElementById("title"),
    circleTop = document.getElementById("circle-top"),
    circleBottom = document.getElementById("circle-bottom"),
    circleInnerTop = document.getElementById("circle-inner-top"),
    circleInnerBottom = document.getElementById("circle-inner-bottom"),
    login = document.getElementById("login");

//open landing menu
header.addEventListener("click", function(){
    circleTop.classList.add("move-up-outer");
    circleInnerTop.classList.add("move-up-inner");
    circleBottom.classList.add("move-down-outer");
    circleInnerBottom.classList.add("move-down-inner");
    login.classList.add("fade-in");
});


//responsive menu
