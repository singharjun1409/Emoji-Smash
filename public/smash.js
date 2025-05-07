const body = document.body;
const emojiForm = document.querySelector(".emojiForm form");
const grid = document.querySelector(".grid");
const emoji = document.querySelector(".emoji");
const scoreElement = document.querySelector(".score");
const gridPosition = grid.getBoundingClientRect();
const easy = document.getElementById("easy");
const medium = document.getElementById("medium")
const hard = document.getElementById("hard");
const cursor = document.querySelector('.cursor')

let score = 0;
let level = 1000;

// Cursor class will mirror the movements of the actual cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});

// Cursor will tilt down to emulate a smash when the mouse is clicked and then revert
grid.addEventListener('mousedown', () => {
    cursor.classList.add('smash');
});
  
grid.addEventListener('mouseup', () => {
    cursor.classList.remove('smash');
});


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
    const icon = document.querySelector("#emojiSelect").value;
    console.log(`Emoji selected ${icon}`);
    emoji.textContent = icon;
    emoji.removeEventListener("click" , emojiClickHandler);
    emoji.addEventListener("click" , emojiClickHandler);
    emojiClickHandler(0);
    const interval = setInterval(runGame , level);
   
    setTimeout(() =>
        {
            clearInterval(interval);
            console.log("Game Over");
            emoji.removeEventListener("click" , emojiClickHandler);
            easy.disabled = false;
            medium.disabled = false;
            hard.disabled = false;
        }, 10000);
    
    
}

function emojiClickHandler(newScore)
{     
    if (typeof newScore === "number") {
        score = newScore; 
    } 
    else 
    {
        score += 1; 
    }

    scoreElement.setAttribute("value" , score);
    scoreElement.textContent = `Score: ${score}`;
    
}


easy.addEventListener("click" , () =>
{
    level = 1000;
    medium.disabled = true;
    hard.disabled = true;
    setup();
})

medium.addEventListener('click' , () =>
{
    level = 900;
    easy.disabled = true;
    hard.disabled = true;
    setup();
})

hard.addEventListener("click" , () =>
{
    level = 800;
    easy.disabled = true;
    medium.disabled = true;
    setup();
})




