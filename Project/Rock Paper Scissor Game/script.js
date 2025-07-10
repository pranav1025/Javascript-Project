const choices = ["rock","paper","scissor"];
const buttons = 
document.querySelectorAll(".choice");
const playerChoiceText = 
document.getElementById("player-choice");
const computerChoiceText = 
document.getElementById("computer-choice");
const winnerText =
document.getElementById("winner");
buttons.forEach(button =>{
    button.addEventListener("click",() => {
        const playerChoice =
        button.getAttribute("data-choice");
        const computerChoice =
        choices[Math.floor(Math.random()*choices.length)];
        playerChoiceText.textContent = `You Choose:${playerChoice}`;
        computerChoiceText.textContent = `You Choose:${computerChoice}`;
        const winner = 
        getwinner(playerChoice,computerChoice);
        winnerText.textContent=winner ;      
    })
})
  function getwinner(player,computer){
    if(player === computer){
        return "It's draw";
    }
    if ((player ==="rock" && computer === "scissor")||
    (player==="scissor" && computer==="paper") ||
    (player==="paper"  && computer === "rock")){
        return "You Win";
    }else{return"Computer Win"}
  }

