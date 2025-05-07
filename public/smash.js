const body = document.body;
const emojiForm = document.querySelector(".emojiForm form");
const grid = document.querySelector(".grid");
const emoji = document.querySelector(".emoji");
const scoreElement = document.querySelector(".score");
const gridPosition = grid.getBoundingClientRect();
let score = 0;


function runGame()
{
    const y = Math.random() * (gridPosition.bottom - gridPosition.top - 50);
    const x = Math.random() * (gridPosition.right - gridPosition.left - 50);
    emoji.style.position = "absolute";
    emoji.style.top = `${y}px`;
    emoji.style.left = `${x}px`
}

function setup(evt)
{
    evt.preventDefault();
    const icon = document.querySelector("#emojiSelect").value;
    console.log(`Emoji selected ${icon}`);
    emoji.textContent = icon;
    emoji.removeEventListener("click" , emojiClickHandler);
    emoji.addEventListener("click" , emojiClickHandler);
    emojiClickHandler(0);
    const interval = setInterval(runGame , 1000);
   

    setTimeout(() =>
        {
            clearInterval(interval);
            console.log("Game Over");
            emoji.removeEventListener("click" , emojiClickHandler);
        }, 10000);

    
}

function emojiClickHandler(newScore)
{ 
    // Check if the argument is a number (newScore) or an event object
    if (typeof newScore === "number") {
        score = newScore; // Set the score to the provided value
    } else {
        score += 1; // Increment the score
    }
    scoreElement.setAttribute("value" , score);
    scoreElement.textContent = `Score: ${score}`;
    
}

emojiForm.addEventListener('submit' , setup);




