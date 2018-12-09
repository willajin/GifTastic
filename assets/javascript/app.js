$(document).ready(function () {
    // initial array of topics
    var topics = ["harry potter", "albus dumbledore", "hermionie granger", "ron weasley", "draco malfoy", "severus snape"];

    // create buttons from topics array
    function createButtons() {
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
        var gif = $(this).attr("data-topic");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=Qh3VnNKk5dvOqMdcB1IpEoJmdQaBsTLp&limit=10";
        console.log(queryURL);

        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < 10; i++) {
                var gifImg = $("<img>");
                gifImg.addClass("gif-img");
                gifImg.attr("src", response.data[i].images.fixed_height_still.url);
                $("#gifs-div").append(gifImg);
            }

        });
    }

    // play gif on click
    $(".gif-img").on("click", function(event) {
        
    });

    // generate gifs when topic button is clicked
    $(document).on("click", ".topic-button", displayGifs)

    createButtons();
});