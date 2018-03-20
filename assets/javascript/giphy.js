$(document).ready(function(){
    const qiphyURL = "http://api.giphy.com/v1/gifs/search?q=";
    const apiKey = "q9vGOgJfe8S2X6UNLksPV5RZRucD48OX";

    let topics = ["apples", "peaches", "pears"];
    let favorites = []; //full of objects

    $("#find-giphy").on("click", function(event){
        $("#giphy-input").text(""); //would like to clear input box as "giphy search" is clicked, this line of code doesn't do that though
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
        for(let i =0; i<10; i++){
            term = "#giphy"+i;
            $(term).empty();
            term = "#giphy"+i+"fav";
            $(term).empty();
        }
        //for loop above empties each giphy-div when new term is clicked to make room for new
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
                rating.text("RATED: "+response.data[i].rating.toUpperCase());

                let favImage = $("<img>");
                favImage.addClass("fav-icon");
                favImage.attr("src", "assets/images/1200px-Heart_corazón.svg.png")
                favImage.attr("alt", "fav-icon");
                favImage.attr("height", "20px");
                favImage.attr("width", "20px");
                favImage.attr("data-name", topics[i]);
                favImage.attr("data-state", "unfav");
                ranImage.attr("data-still", imageUrlStill);
                ranImage.attr("data-animate", imageUrlAnimate);
                ranImage.attr("rating", response.data[i].rating);

                // let b = $("<button");
                // b.addClass("add-to-fav-bttn");
                // b.attr("data-name", topics[i]);
                // b.text("LOVE");
                // for some reason declaring b, even without appending it to the page, makes it so nothing appears when the topic button is clicked?

                $("#giphy"+num).append(rating);
                $("#giphy"+num).append(ranImage);
                $("#giphy"+num+"fav").append(favImage);
                //$("#giphy"+num+"fav").append(button);
           }
       })

    }

    function alterState(){
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    function addToFav(){
        if($(this).attr("data-state")==="unfav"){
            $(this).attr("height", "30px");
            $(this).attr("width", "30px");
            let newFav = $(this);
            favorites.push(newFav);
            console.log(favorites);
            $(this).attr("data-state", "fav")
        }
        else
        {
            $(this).attr("height", "20px");
            $(this).attr("width", "20px");
            let find;
            
            for(let i=0; i<favorites.length; i++){
                if(favorites[i].attr("data-name")===$(this).attr("data-name")){
                    find = favorites[i];
                    delete favorites[find]; //warning- may leave this index of the array undefined
                    //how to just remove one index of array? seems like it's not possible,
                    //does an entire new favorites array need to be created every tim, filtering out "undefined" through loops?
                    console.log(favorites);
                }
            }
            $(this).attr("data-state", "unfav")
        }
        //allows items to be added and removed from favorites
    
    }
   $(document).on("click", ".giphy-search-bttn", displayGiphy);
   $(document).on("click", ".image", alterState);
   $(document).on("click", ".fav-icon", addToFav);
   
   createButtons();

    $("#fav").on("click", function(event) {
        displayFav();
    })

    function displayFav(){
        for(let i =0; i<10; i++){
            term = "#giphy"+i;
            $(term).empty();
            term = "#giphy"+i+"fav";
            $(term).empty();
        }
        //for loop above empties each giphy-div when fav is clicked to make room for favorites

        //does not display the images currently and i'm unsure why
        for(let i = 0; i<favorites.length & i<10; i++){
                let num = i.toString();

                let favImage = $("<img>");
                favImage.addClass("image");
                favImage.attr("src", $(favorites[i]).attr("data-still"));
                favImage.attr("alt", "fav-img");
                favImage.attr("height", "300px");
                favImage.attr("width", "300px");
                favImage.attr("data-name", $(favorites[i]).attr("data-name"));
                favImage.attr("data-state", "still");
                favImage.attr("data-still", $(favorites[i]).attr("data-still"));
                favImage.attr("data-animate", $(favorites[i]).attr("data-animate"));
                favImage.attr("rating", $(favorites[i]).attr("rating"));
                favImage.attr("giphy-num", "#giphy"+num);

                let rating = $("<p>");
                rating.text("RATED: "+ $(favImage).attr("rating").toUpperCase());

                $("#giphy"+num).append(rating);
                $("#giphy"+num).append(favImage);
                //will only display ten most recent favorites
        }
       
    }

})