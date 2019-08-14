$(document).ready(function() {

    // VARIABLES ===================================================

    var wins = 0;
    var losses = 0;
    var index = 0;
    var crystalNumArr = [];
    var crystalImageIndexArr = [];
    var randomNum = 0;
    var totalScore = 0;
    var reset = false;
    var imagePath = "assets/images/";
    // array containing crystal images
    var crystalImageArr = ["crystal-1.jpg","crystal-2.jpg","crystal-5.jpg","crystal-6.jpg","crystal-7.jpg","crystal-8.jpg","crystal-9.jpg","crystal-10.jpg","crystal-11.jpg","crystal-12.jpg"];


    // FUNCTIONS TO SET NUMBERS =====================================

    // generate random target number
    var setRandomNum = function () {
        while (randomNum < 19) {
            randomNum = Math.floor(Math.random() * 121) + 1; // control the range of possible integers
        }
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
        } // end for
    } // end define setRandomArr

    // generate random images for the crystal buttons
    var setCrystalImages = function () { 
        for (i = 0; i <= 3; i++) {
            // get random index from array
            var index = (Math.floor(Math.random() * crystalImageArr.length)); 
            // test if the index value already exists in the array
            while (jQuery.inArray(index, crystalImageIndexArr) !== -1) { 
                index = (Math.floor(Math.random() *  crystalImageIndexArr.length));
            } // end while
            crystalImageIndexArr.push(index);
            // get image filename
            image = crystalImageArr[index];
            console.log("imagePath + image" + imagePath + image);
        } // end for

        // find the crystal-display div
        var targetDiv = $("#crystal-display");
        // append each button/img div
        for (j = 0 ; j <= 3 ; j++ ) { 
            var item = crystalImageIndexArr[j];
            var crystal = crystalImageArr[item];
            var crystalPath = imagePath + crystal;
            var imageDiv = '<button id="' + j + '" value="crystal"><img src="' + crystalPath + '" class="crystal"></button>';
            targetDiv.append(imageDiv);
        }
    } // end define setCrystalImages function

    // playAgain function that initializes score, message, and computes random numbers
    var playAgain = function () {
        randomNum = 0;
        totalScore = 0;
        crystalNumArr = [];
        setRandomNum();
        $("#score-value").text(totalScore);
        $("#message").text("");
        setRandomArr();
    } // end var playAgain


// PAGE LOAD =================================================================

    // hide hide-instructions and play buttons, hide instructions when loading

    $(".hide-instructions").hide();
    $(".instructions").hide();
    $(".play").hide();
    $(".reset").show();
    
    // Call functions when page loads
    setCrystalImages(); // set the crystal images
    setRandomArr(); // call the setRandomArr function for crystal values
    setRandomNum(); // call the setRandomNum to set random number


    // EVENTS ========================================================

    // click event captured for all buttons
    $(document).on("click", "button", function () {
        // saving the clicked button id and value
        var id = $(this).attr("id");
        var value = $(this).attr("value");

        // if crystal button get value from the crystalNumArr
        if (value === "crystal") {
            index = parseInt(id);
            totalScore = totalScore + crystalNumArr[index];
            // add to the total score and update the html
            $("#score-value").text(totalScore);

            // test if score matches the random number (win) or greater (lose)
            if ( totalScore === randomNum ) {
                wins++;
                reset = true;
                // update the page
                $("#wins").text(wins);
                $("#message").text("You won!");
            } // end if game is won

            if ( totalScore > randomNum ) {
                losses++;
                reset = true;
                $("#losses").text(losses);
                $("#message").text("You lost!");
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
            console.log("totalScore = " + totalScore);
        }

        // Reset button clicked
        else if (value === "reset-game") {
            location.reload();
        }

    }); // end click button event

}); // end of document.ready