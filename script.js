// Variables to reference the inputs for container
const userName = document.querySelector('#user-name-input');
const okButton = document.querySelector('#button');
const popUp = document.querySelector('.pop-up');
const container = document.querySelector('.container');
const userNameValue = document.querySelector('.userNameValue');
const userNameValue1 = document.querySelector('.userNameValue1');

// Variables to reference inputs for container2
const containerTwo = document.querySelector('.container2');
const playButton = document.querySelector('#button1');
const minimum = document.querySelector('#minimum');
const maximum = document.querySelector('#maximum');
const popUp1 = document.querySelector('.pop-up1');


// Variables to reference inputs for container3
const containerThree = document.querySelector('.container3');
const chosenNumber = document.querySelector('.input3');
const submitButton = document.querySelector('.submit-button');
const errorMessage = document.querySelector('.error-message');
let attemptsLeft = 5;


// Function to check the chosen number input 
function checkChosenNumber() {
    const chosenValue = parseFloat(chosenNumber.value)
    if (chosenValue === "" || isNaN(chosenValue)) {
        errorMessage.textContent = "Please enter a number";
        errorMessage.style.color = 'red';
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 2000);
        return;
    }  
    
    // Retrieve game data from local Storage
    const storedGameData = JSON.parse(localStorage.getItem('gameData'));

    const { min, max, randomNumber, attemptsLeft} = storedGameData;

    // Check if chosen value is within the min and max range
    if (chosenValue < min || chosenValue > max) {
        errorMessage.textContent = `Please enter a number between ${min} and ${max}`;
        errorMessage.style.color = 'red';
        setTimeout(() => {
            errorMessage.textContent = "";
        }, 2000);
        return;
    }

    // Check if chosen value matches the random number
    if (chosenValue === randomNumber) {
        const storedUserName = localStorage.getItem('storedUserName') || 'user'; // Access username within the block
        errorMessage.textContent = `Congratulations ${storedUserName}! ${chosenValue} is the correct answer!`;
        errorMessage.style.color = 'green';
        submitButton.textContent = "Play Again";
        chosenNumber.style.border = "1px solid green";
        submitButton.style.backgroundColor = "green";
        setTimeout(() => {
            submitButton.style.backgroundColor = "black";
            chosenNumber.style.border = "";
        }, 2000)
    } 
    else {
        let attemptsLeft = storedGameData.attemptsLeft - 1; // Use let here
        const attemptsText = attemptsLeft > 1? "attempts" : "attempt";
        const storedData = JSON.parse(localStorage.getItem('gameData')) || {}; // Handle missing game data
        const storedUserName = localStorage.getItem('storedUserName') || 'defaultUser'; // Handle missing 
        if (attemptsLeft > 0) {
            errorMessage.textContent = `${chosenValue} is wrong, you have ${attemptsLeft} ${attemptsText} remaining.`;
            errorMessage.style.color = 'red';
            chosenNumber.style.border = "1px solid red";
        } else {
            errorMessage.textContent = `You have exhausted your trials ${storedUserName || 'user'}! ${randomNumber} is the winning number.`;
            submitButton.textContent = "Play Again";
            chosenNumber.style.border = "1px solid red";
        }

        // Update game data with remaining attempts
        storedGameData.attemptsLeft = attemptsLeft;
        localStorage.setItem('gameData', JSON.stringify(storedGameData));
    }
    // Reset chosen number input field
    chosenNumber.value = "";
}


// function to check the Minimum and Maximum input 
function checkMinAndMax() {
    const min = parseFloat(minimum.value);
    const max = parseFloat(maximum.value);
    if (min > max) {
        popUp1.classList.remove('hidden');
        popUp1.textContent = "Minimum value should be less than maximum value";
        setTimeout(() => {
            popUp1.classList.add('hidden');
        }, 2000)
        return;
    }
    if (max - min < 4) {
        popUp1.classList.remove('hidden');
        popUp1.textContent = "The difference between your max and min should be at least 10.";
        setTimeout(() => {
            popUp1.classList.add('hidden');
        }, 2000)
        return;
    } 
    if (minimum.value === "" || maximum.value === "" || isNaN(min) || isNaN(max)) {
        popUp1.classList.remove('hidden');
        popUp1.textContent = "Please enter a number";
        setTimeout(() => {
            popUp1.classList.add('hidden');
            minimum.value = "";
            maximum.value = "";
        }, 2000)
        return;
    } 
    else {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const attemptsLeft = 5;

        const gameData = {
            min,
            max,
            randomNumber,
            attemptsLeft
        };

        localStorage.setItem('gameData', JSON.stringify(gameData));

        // Update the UI
        document.querySelector('#min-value').textContent = min;
        document.querySelector('#max-value').textContent = max;

        minimum.value = "";
        maximum.value = "";
        popUp1.classList.add('hidden');
        container.classList.add('hidden');
        containerTwo.classList.add('hidden');
        chosenNumber.value = "";
        container.classList.add('hidden');
        containerTwo.classList.add('hidden');
        containerThree.classList.remove('hidden');

        const minValue = document.querySelector('#min-value');
        const maxValue = document.querySelector('#max-value');

        minValue.textContent = min;
        maxValue.textContent = max;
    }
}



// Function to check the Username input
function checkUserNameInput() {
    if (userName.value === '') {
        popUp.classList.remove('hidden');
        popUp.textContent = "You are yet to enter a username";
        setTimeout(() => {
            popUp.classList.add('hidden');
            popUp.textContent = "";
        }, 2000)
    } else {
        localStorage.setItem('storedUserName', userName.value);
        userNameValue.textContent = userName.value;
        userNameValue1.textContent = userName.value;
        userName.value = "";
        container.classList.add('hidden');
        containerTwo.classList.remove('hidden');
        containerThree.classList.add('hidden');
    }
}
// Function that adds the class hidden to all containers but the first one when the page refreshes
function hideAllContainers() {
    container.classList.remove('hidden');
    containerTwo.classList.add('hidden');
    containerThree.classList.add('hidden');
    localStorage.removeItem('gameData');
    localStorage.removeItem('storedUserName');
    errorMessage.textContent = "";
}


// Current Year Function 
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Event Listeners to run specific functions 
playButton.addEventListener('click', checkMinAndMax);
okButton.addEventListener('click', checkUserNameInput);
submitButton.addEventListener('click', () => {
    if (submitButton.textContent === 'Play Again') {
        hideAllContainers();
        // Reset game state if needed (e.g., clear local storage)
        return;
      }
      checkChosenNumber();
});
window.onload = hideAllContainers;


