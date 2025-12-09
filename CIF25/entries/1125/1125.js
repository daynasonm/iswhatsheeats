let body = document.body;
let headlines = document.querySelectorAll("h1");


// uses forEach to loop through all of the headlines
headlines.forEach(function(headline) {
  // add an event listener to each individual headline
  headline.addEventListener('click', function (event) {
    // toggle the red class on this headline
    headline.classList.toggle("red");
  });
});