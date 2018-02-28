var displaySearch = document.getElementById("display-search-button"),
    mobileSearchClose = document.getElementById("mobile-search-close"),
    navbar = document.getElementById("navbar"),
    mobileSearch = document.getElementById("mobile-search");
    
    //open mobile search
displaySearch.addEventListener("click", function(){
    mobileSearch.style.display="block";
   
});
    //close mobile search
mobileSearchClose.addEventListener("click", function(){
    mobileSearch.style.display="none";
    
});




