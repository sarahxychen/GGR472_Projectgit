function search() {
    // Declare variables
    var input, filter;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("card")
    titles = document.getElementsByClassName("card-title");
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cards.length; i++) {
      a = titles[i];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }