$(document).ready(function () {
    // initial array of topics
    var topics = ["harry potter", "albus dumbledore", "hermionie granger", "ron weasley", "draco malfoy", "severus snape"];

    // create buttons from topics array
    function createButtons() {
        // clears previous buttons
        $("#buttons-div").empty();

        // creates buttons from topics array
        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("topic-button");
            topicButton.attr("data-topic", topics[i]);
            topicButton.text(topics[i]);
            $("#buttons-div").append(topicButton);
        }
    }

    // display gifs
    function displayGifs() {
        $("#gifs-div").empty();

        var gif = $(this).attr("data-topic");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=Qh3VnNKk5dvOqMdcB1IpEoJmdQaBsTLp&limit=10";
        console.log(queryURL);

        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                // create html elements for gif and rating
                var gifDiv = $("<div>");
                var gifRating = $("<p>").text("Rating: " + response.data[i].rating);

                // get gif img
                var gifImg = $("<img>").addClass("gif-img");
                gifImg.attr("src", response.data[i].images.fixed_height_still.url);
                // get still gif img
                gifImg.attr("data-still", response.data[i].images.fixed_height_still.url);
                // get animated gif img
                gifImg.attr("data-animate", response.data[i].images.fixed_height.url);
                // set data-state to still
                gifImg.attr("data-state", "still");

                gifDiv.append(gifImg);
                gifDiv.append(gifRating);
                
                $("#gifs-div").append(gifDiv);
            }

            // play/stop gif on click
            $(".gif-img").on("click", function() {
                // get data-state
                var state = $(this).attr("data-state");

                // if state is still, set src to animated gif
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                // else set src to still gif
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    // generate gifs when topic button is clicked
    $(document).on("click", ".topic-button", displayGifs)

    // add gif topic
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        // get user input
        var gifInput = $("#gif-input").val().trim();

        // add user input to topics array
        topics.push(gifInput);

        // create button
        createButtons();
    });

    // create initial buttons
    createButtons();
});