$(document).ready(function() {

    // VARIABLES ===================================================

    var wins = 0;
    var losses = 0;
    var index = 0;
    var crystalNumArr = [];
    var randomNum = 0;
    var totalScore = 0;

    // FUNCTIONS TO SET NUMBERS =====================================

    // generate random numbers for the crystals
    var setRandomArr = function () { 
        for (i = 1; i <= 4; i++) {
            var num = (Math.floor(Math.random() * 12)) + 1; // add 1 to ensure value is not zero
            while (jQuery.inArray(num, crystalNumArr) !== -1) { // test if the value already exists in the array
                num = (Math.floor(Math.random() * 12)) + 1;
            }
            crystalNumArr.push(num);
        } console.log(crystalNumArr);
    } 

    setRandomArr(); // call the setRandomArr function

    // generate random target number
    while (randomNum < 19) {
        randomNum = Math.floor(Math.random() * 121) + 1;
    }
    console.log("Random Num = " + randomNum);

    // update the randomNum html 
    $("#random-value").text(randomNum);


    // EVENTS ========================================================

    // click event captured
    $(document).on("click", "button", function () {
        // saving the clicked button
        var id = $(this).attr("id");
        var value = $(this).attr("value");
        console.log("id = " + id);
        console.log("name = " + value);

        // if crystal get value from the crystalNumArr and add to the total score and update the html
        if (value === "crystal") {
            index = parseInt(id);
            totalScore = totalScore + crystalNumArr[index];
            $("#score-value").text(totalScore);

        console.log("Total Score = " + totalScore);

        // test if score matches the random number (win) or is great (lose)
        if ( totalScore === randomNum ) {
            console.log("I WIN!!!");
            wins++;
            $("#wins").text(wins);
            reset = true;
        } // end if game is won

        if ( totalScore > randomNum ) {
            console.log("I LOST.");
            losses++;
            $("#losses").text(losses);
            reset = true;
        } // end if game is lost

        // reset the game if won or lost - new randomNum, and new crystal values
        // append PLAY AGAIN button and RESET, plus message


    } // end if crystal was clicked



    });




}); // end of document.ready