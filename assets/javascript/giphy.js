$(document).ready(function(){
    const qiphyURL = "http://api.giphy.com/v1/gifs/search?q=";
    const apiKey = "q9vGOgJfe8S2X6UNLksPV5RZRucD48OX";

    let topics = ["apples", "peaches", "pears"];

    $("#find-giphy").on("click", function(event){
        event.preventDefault();
        let searchTerm = $("#giphy-input").val().trim();
        topics.push(searchTerm);
        createButtons();
    });

    function createButtons(){
        $("#search-bttns").empty();

        for (let i=0; i < topics.length; i++){
            let button = $("<button>");
            button.addClass("giphy-search-bttn");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#search-bttns").append(button);
        }
    }

    function displayGiphy(){
        $("#show-giphy").empty();
        let searchTerm = $(this).attr("data-name");
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=10";

       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response) {
           for(let i=0; i <10; i++){
                num = i.toString();
                let imageUrlStill = response.data[i].images.original_still.url;
                let imageUrlAnimate = response.data[i].images.original.url;

                let ranImage = $("<img>");
    
                ranImage.addClass("image");
                ranImage.attr("src", imageUrlStill);
                ranImage.attr("data-still", imageUrlStill);
                ranImage.attr("data-animate", imageUrlAnimate);
                ranImage.attr("data-state", "still");
                ranImage.attr("giphy-num", "#giphy"+num);
                ranImage.attr("rating", response.data[i].rating);
                ranImage.attr("alt", "random image");
                ranImage.attr("height", "300px");
                ranImage.attr("width", "300px");

                let rating = $("<p>");
                rating.text(response.data[i].rating);
            
                $("#giphy"+num).append(rating);
                $("#giphy"+num).append(ranImage);


                //code so giphy appears static but animates once it's clicked
                //then stlying n ur good 2 go
                //create favorites section
           }
           console.log(response);
       })

    }

    function alterState(){

        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    }

   $(document).on("click", ".giphy-search-bttn", displayGiphy);
   $(document).on("click", ".image", alterState);
   createButtons();

})