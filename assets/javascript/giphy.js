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
                let imageUrl = response.data[i].images.original.url;

                let ranImage = $("<img>");
    
                ranImage.attr("src", imageUrl);
                ranImage.attr("alt", "random image");
                ranImage.attr("height", "300px");
                ranImage.attr("width", "300px");
            
                $("#show-giphy").append(ranImage);
           }
           console.log(response);
       })

    }

   $(document).on("click", ".giphy-search-bttn", displayGiphy);
   createButtons();

})