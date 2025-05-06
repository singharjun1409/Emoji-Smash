const body = document.body;
const emojiForm = document.querySelector(".emojiForm form");
const grid = document.querySelector(".grid");
const emoji = document.querySelector(".emoji");
const gridPosition = grid.getBoundingClientRect();

function runGame()
{
    const y = Math.random() * (gridPosition.bottom - gridPosition.top - 10);
    const x = Math.random() * (gridPosition.right - gridPosition.left - 10);
    emoji.style.position = "absolute";
    emoji.style.top = `${y}px`;
    emoji.style.left = `${x}px`
}
// Get the positional values

emojiForm.addEventListener('submit' , function(evt)

{
    evt.preventDefault();
    const icon = document.querySelector("#emojiSelect").value;
    console.log(`Emoji selected ${icon}`);
    emoji.textContent = icon;
    runGame();
    
});


