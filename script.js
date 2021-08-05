const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let flippedCards = [];
let counter = 0;

function handleCardClick(event) {
  if (counter < 2) {
    //prevent user from being able to match with the same card 
    if (!(event.target.classList.contains('flipped'))) {
      event.target.classList.add('flipped');
      counter += 1;

      //add card to flippedCard array
      flippedCards.push(`${event.target.classList}`)

      //display selection for 1 second before checking cards
      setTimeout(function () {
        //check to see how many flipped cards there are and compare if there are 2 matching
        checkFlippedCards(flippedCards);
      }, 1000)
    }
  }
}

function checkFlippedCards(arr) {
  if (counter >= 2) {
    let card1 = arr[0];
    let card2 = arr[1];

    //check to see if the two array elements
    if (card1 === card2) {

      //remove flipped class and add paired class if the two cards match
      for (let i = 0; i < gameContainer.children.length; i++) {
        if (gameContainer.children[i].classList.contains('flipped')) {
          gameContainer.children[i].classList.remove('flipped')
          gameContainer.children[i].classList.add('paired')
        }
      }
    } else {

      //unflip unmatched cards!
      for (let i = 0; i < gameContainer.children.length; i++) {
        if (gameContainer.children[i].classList.contains('flipped')) {
          gameContainer.children[i].classList.remove('flipped')
        }
      }
    }

    //clear values to reset flipped cards array and counter
    counter = 0;
    flippedCards = [];
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
