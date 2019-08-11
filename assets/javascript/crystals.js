$(document).ready(function() {

    // VARIABLES ===================================================

    var wins = 0;
    var losses = 0;
    var index = 0;
    var crystalNumArr = [];
    var randomNum = 0;
    var totalScore = 0;
    var reset = false;

    // hide play, reset and show-instructions buttons when loading

    $(".hide-instructions").hide();
    $(".instructions").hide();
    $(".play").hide();
    $(".reset").show();

    // FUNCTIONS TO SET NUMBERS =====================================

    // generate random target number
    var setRandomNum = function () {
        while (randomNum < 19) {
            randomNum = Math.floor(Math.random() * 121) + 1; // control the range of possible integers
        }
        console.log("Random Num = " + randomNum);
        // update the randomNum html 
        $("#random-value").text(randomNum);
    } // end var setRandomNum

    // generate random numbers for the crystals
    var setRandomArr = function () { 
        for (i = 1; i <= 4; i++) {
            var num = (Math.floor(Math.random() * 12)) + 1; // add 1 to ensure value is not zero
            while (jQuery.inArray(num, crystalNumArr) !== -1) { // test if the value already exists in the array
                num = (Math.floor(Math.random() * 12)) + 1;
            }
            crystalNumArr.push(num);
        } console.log(crystalNumArr);
    } // end define setRandomArr

    // playAgain function that initializes score, message, and computes random numbers
    var playAgain = function () {
        randomNum = 0;
        crystalNumArr = [];
        setRandomNum();
        $("#score-value").text("0");
        $("#message").text("");
        setRandomArr();
    } // end var playAgain

    // Call functions when page loads
    setRandomArr(); // call the setRandomArr function for crystal values
    setRandomNum(); // call the setRandomNum to set random number


    // EVENTS ========================================================

    // click event captured for all buttons
    $(document).on("click", "button", function () {
        // saving the clicked button id and value
        var id = $(this).attr("id");
        var value = $(this).attr("value");
        console.log("id = " + id);
        console.log("name = " + value);

        // if crystal button get value from the crystalNumArr
        // add to the total score and update the html
        if (value === "crystal") {
            index = parseInt(id);
            totalScore = totalScore + crystalNumArr[index];
            $("#score-value").text(totalScore);

            console.log("Total Score = " + totalScore);

            // test if score matches the random number (win) or greater (lose)
            if ( totalScore === randomNum ) {
                wins++;
                reset = true;
                // update the page
                $("#wins").text(wins);
                $("#message").text("You won!");
                console.log("YOU WON!!!");
            } // end if game is won

            if ( totalScore > randomNum ) {
                losses++;
                reset = true;
                $("#losses").text(losses);
                $("#message").text("You lost!");
                console.log("YOU LOST.");
            } // end if game is lost

            // id game won/lost, show PLAY and RESET buttons
            if (reset) {
                $(".play").show();
                $(".reset").show();
            } // end reset

        } // end if crystal button clicked

        // Hide instructions button clicked
        else if (value === "hide-instructions") {
            $(".instructions").hide();
            $(".hide-instructions").hide();
            $(".show-instructions").show();
        } 

        // Show instructions button clicked
        else if (value === "show-instructions") {
            $(".instructions").show();
            $(".hide-instructions").show();
            $(".show-instructions").hide();
        } 
        
        // Play button clicked
        else if (value === "play-game") {
            playAgain();
        }

        // Reset button clicked
        else if (value === "reset-game") {
            location.reload();
        }

    }); // end click button event

}); // end of document.ready