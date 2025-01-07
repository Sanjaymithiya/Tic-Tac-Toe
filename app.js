let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgbox = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");
let intro = document.querySelector(".intro");

let player1 = true;

let disablebtn = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

let enablebtn = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button clicked")
        if (player1) {
            box.innerText = "O";
            player1 = false;
        } else {
            box.innerText = "X";
            player1 = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

const showWinner = (winner) => {
    msg.innerText = `Congratulation! Winner is ${winner}`;
    disablebtn();
}

const resetGame = () => {
    player1 = true;
    enablebtn();
    msgbox.classList.add("hide");
    container.classList.remove("hide");
}
const checkWinner = () => {
     for(let pattern of winPattern){
         let pos1 = boxes[pattern[0]].innerText;
         let pos2 = boxes[pattern[1]].innerText;
         let pos3 = boxes[pattern[2]].innerText;

         if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                container.classList.add("hide");
                msgbox.classList.remove("hide");
                showWinner(pos1);
            }
         }
     }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);