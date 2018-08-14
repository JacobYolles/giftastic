
// CREATING A DOCUMENT READY FUNCTION
$(document).ready(function() {
    // Creating variables:
var states = ["Alaska", "Arizona", "California", "Colorado", "Florida", "Minnesota", "Utah", "Nebraska", "Texas", "North Dakota", "South Dakota", "Wisconsin", "New Mexico", "Oregon", "Washington", ];


    // Sample Code:
// CREATING A FUNCTION TO MAKE THE BUTTONS APPEAR:
function makeButtons(){ 
    //Deleting prior buttons for clarity.
    $("#buttonsView").empty();
    // THIS FOR LOOP WILL CREATE THE BUTTONS AS WAS MADE IN THE HELPFUL AJAX CODE WITHOUT HAVING THEM HAVE TO BE HARD CODED.
    for (var i = 0; i < states.length; i++){
        var a = $("<button>") 
		a.addClass("stateName"); 
		a.attr("data-name", states[i]); 
		a.text(states[i]); 
		$("#buttonsView").append(a); 
    }; // END OF FOR LOOP
}; // END OF MAKE BUTTONS FUNCTION.


// HANDLES THE FORM FOR ADDING BUTTONS
$("#addState").on("click", function(){

	// grabs the user's state input
	var state = $("#state-input").val().trim();
	// that input is now added to the array
	states.push(state);
	// the makeButtons function is called, which makes buttons for all my states plus the users input for any new states.
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})


 // http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY api gify returning for a search of funny cats.


//Instead of using a button on click, create the ajax through a function.
function displayStateGifs() {
        var state = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + state +  "&api_key=iFkKQCnT6dVZjMAxRXbekzVSZZEfG514&limit=10";
        
          // AJAX CALL:
        $.ajax({
            url: queryURL,
            method: "GET"
          }) .done(function(response) {
                console.log(response)
                var results = response.data
                for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=gifs>");
                var stateGif = $("<img>");
                var p = $("<p id='rating-text'>")
                    p.text("Rating: " + results[i].rating);
                var title = $("<p id='title-text'>")
                    title.text("Title: " + results[i].title)    
                // IMAGE SOURCE
                    stateGif.attr("src", results[i].images.fixed_height_still.url);
                    stateGif.attr("title", "Rating: " + results[i].rating);
                    stateGif.attr("data-still", results[i].images.fixed_height_still.url);
					stateGif.attr("data-state", "still");
					stateGif.addClass("gif");
					stateGif.attr("data-animate", results[i].images.fixed_height.url);
                gifDiv.append(stateGif);
                gifDiv.append(p)
                gifDiv.append(title)
                $("#gifsView").prepend(gifDiv);
                } // FOR END

            }); // ajax call end.

    } // END  FOR FUNCTION DISPLAYSTATEGIFS

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
            if ( state == "still"){
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                }else{
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                };
    });
    
  
    $(document).on("click", ".stateName", displayStateGifs);



makeButtons(); // AN INITIAL CALL TO MAKE THE BUTTONS

}); // document ready end