let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let details = document.querySelector(".details");
let msg = document.querySelector("#msg");

let turnO = true;//PlayerX,Player(O)
let count = 0; //To Track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

details.classList.remove("hide");

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    details.classList.remove("hide");
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const gameDraw = () => {
    msg.innerText = `Game Draw`;
    details.classList.add("hide");
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const showWinner = (winner) => {
    msg.innerText = `Congratulation Winner is ${winner}`;
    details.classList.add("hide");
    msgContainer.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){//PlayerO
            box.innerText = "O";
            turnO = false;
        }
        else{//PlayerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});

const checkWinner = () => {
    for(pattern of winPatterns){

        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);