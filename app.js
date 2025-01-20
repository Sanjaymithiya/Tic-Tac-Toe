let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgbox = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");
let intro = document.querySelector(".intro");

let player1 = true; // Track current player
let moveCount = 0;  // Track number of moves made

// Disable all buttons
let disablebtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all buttons and reset move count
let enablebtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    moveCount = 0;
};

// Winning patterns for Tic-Tac-Toe
let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1) {
            box.innerText = "O";
            player1 = false;
        } else {
            box.innerText = "X";
            player1 = true;
        }
        box.disabled = true; // Disable clicked box
        moveCount++;         // Increment move count
        checkWinner();       // Check for winner or draw
    });
});

// Display winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    disablebtn();
};

// Display draw message
const showDraw = () => {
    msg.innerText = `Game was Draw. Play Again`;
    disablebtn();
};

// Reset the game
const resetGame = () => {
    player1 = true;               // Reset to Player 1
    enablebtn();                  // Enable all buttons
    msgbox.classList.add("hide"); // Hide message box
    container.classList.remove("hide"); // Show game board
};

// Check for winner or draw
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Check if all positions in the pattern are the same and not empty
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                container.classList.add("hide");     // Hide game board
                msgbox.classList.remove("hide");    // Show message box
                showWinner(pos1);                   // Show winner message
                return;                             // Exit early
            }
        }
    }

    // Check for draw if all moves are played
    if (moveCount === 9) {
        container.classList.add("hide");     // Hide game board
        msgbox.classList.remove("hide");    // Show message box
        showDraw();                         // Show draw message
    }
};

// Attach event listeners to reset buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
