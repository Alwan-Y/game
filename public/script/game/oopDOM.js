class Player {
    constructor(name) {
        this.name = name
    }
    getName = () => {
        return this.name
    }
}

class PlayerHuman extends Player {
    constructor() {
        super()
    }

    playerChoice = (choice) => {
        if (game.startResult === null) {
            const playerChoice = choice.classList[1]
            const computerChoice = comp.getComputerChoice()
            
            game.setPlayerChoice(playerChoice)
            game.setCompChoice(computerChoice)
            game.getResult(playerChoice, computerChoice)
            choice.style.backgroundColor = '#d8d8d8'
            choice.style.padding = '5px'
            game.reset = choice

            game.turning()

            setTimeout(() => {
                switch(computerChoice) {
                    case 'rock':
                        game.compRock.classList.add('mix')
                        game.changeComputerValue = 'rock'
                        break
                    case 'paper':
                        game.compPaper.classList.add('mix')
                        game.changeComputerValue = 'paper'
                        break
                    default:
                        game.compScis.classList.add('mix')
                        game.changeComputerValue = 'scissor'
                }
                game.endResult(game.startResult)
            }, 1200);
        } else if (game.startResult) {
            alert('Tekan Refresh dulu !!')
        }
    }
}


class Comp extends Player {
    constructor() {
        super()
    }

    getComputerChoice = () => {
        const computer = Math.random()
    
        if (computer < 0.34) return 'rock'
        if (computer >= 0.34 && computer < 0.67) return 'scissor'
        return 'paper'
    }
}

class Game {
    constructor(player, comp) {
        this.player = player
        this.comp = comp
        this.startResult = null
        this.reset = ''
        this.changeComputerValue = ''
        this.playerChoice = ''
        this.compChoice = ''

    this.resultDisplay = document.getElementById('gameResult')
    this.computerChoice = document.querySelectorAll('.computer')
    this.compRock = document.querySelector('.compRock')
    this.compPaper = document.querySelector('.compPaper')
    this.compScis = document.querySelector('.compScissor')
    }

    setPlayerChoice = (playerChoice) => this.playerChoice = playerChoice
    setCompChoice = (compChoice) => this.compChoice = compChoice
    setStartResult = (result) => this.startResult = result

    getResult = (player, computer) => {
        if (player === computer) this.startResult = 'DRAW';
        else if (player === 'rock' && computer === 'scissor') this.startResult = 'WINNER' 
        else if (player === 'rock' && computer === 'paper') this.startResult = 'LOSER' 
        else if (player === 'paper' && computer === 'rock') this.startResult = 'WINNER'
        else if (player === 'paper' && computer === 'scissor') this.startResult = 'LOSER' 
        else if (player === 'scissor' && computer === 'paper') this.startResult = 'WINNER'
        else if (player === 'scissor' && computer === 'rock') this.startResult = 'LOSER' 

    }

    turning = () => {
        const start = new Date().getTime();
        let i = 0
    
        setInterval(() => {
            if (new Date().getTime() - start >= 1000) {
                clearInterval
                return
            }
            this.computerChoice[i++].classList.add('mix')
            if (i == this.computerChoice.length) {
                i = 0
            }
        }, 50)
        setTimeout(() => {
            setInterval(() => {
                if (new Date().getTime() - start >= 1200) {
                    clearInterval
                    return
                }
                this.computerChoice[i++].classList.remove('mix')
                if (i == this.computerChoice.length) {
                    i = 0
                }
            }, 50);
        }, 50)
    }

    endResult = (result) => {
        switch(result) {
            case 'DRAW':
                this.resultDisplay.innerHTML = 'DRAW';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '150%'
                this.resultDisplay.style.backgroundColor = '#1A6932'
                this.resultDisplay.style.padding = '10%'
                break
            case 'WINNER':
                this.resultDisplay.innerHTML = 'PLAYER WIN';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '120%'
                this.resultDisplay.style.backgroundColor = '#4c9653'
                this.resultDisplay.style.padding = '10%'
                break
            case 'LOSER':
                this.resultDisplay.innerHTML = 'COM WIN';
                this.resultDisplay.style.color = 'white'
                this.resultDisplay.style.fontSize = '150%'
                this.resultDisplay.style.backgroundColor = '#4c9653'
                this.resultDisplay.style.padding = '10%'
                break
            default:
                this.resultDisplay.innerHTML = 'VS';
                this.resultDisplay.style.backgroundColor = '#9b835f'
                this.resultDisplay.style.fontSize = '40pt'
                this.resultDisplay.style.color = 'red'
                this.resultDisplay.style.fontWeight = 'bolder'
        }
    }

    sendHistory = () => {
        console.log(this.playerChoice)
        console.log(this.compChoice)
        console.log(this.startResult)
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5001/apis/posts");
        xhr.setRequestHeader("Content-Type", "application/json");
        const result = {
            playerChoice: this.playerChoice,
            computerChoice: this.compChoice,
            result: this.startResult
        }
        xhr.send(JSON.stringify(result));
    }

    refresh = () => {
        this.reset.style.backgroundColor = '#9b835f'
        this.reset.style.padding = '0px'

        const playerChoice = null
        const computerChoice = null
        const startResult = null

        this.setPlayerChoice(playerChoice)
        this.setCompChoice(computerChoice)
        if (this.changeComputerValue == 'rock') {
            this.compRock.classList.remove('mix')
        } else if (this.changeComputerValue == 'paper') {
            this.compPaper.classList.remove('mix')
        } else {
            this.compScis.classList.remove('mix')
        }

        this.setStartResult(startResult)
        this.endResult(startResult)
    }

    getHistory = () => {
        const xhr = new XMLHttpRequest();
                
        xhr.onload = function() {
            const responseJson = JSON.parse(this.responseText);
            if(responseJson.error) {
                console.log(responseJson.message);
            } else {
                game.renderAllHistory(responseJson.data)
            }
        }
        
        xhr.onerror = function() {
            allert('Internal server error')
        }
        
        xhr.open("GET", "http://localhost:5001/apis/posts");
        xhr.send();
    };

    renderAllHistory = (history) => {
        const listHistoryElement = document.querySelector("#listHistory");
        listHistoryElement.innerHTML = "";
    
        history.forEach(history => {
            listHistoryElement.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px; ">
                <div class="card" style="background-color:#724C21; border-radius: 20px; ">
                    <div class="card-body">
                        <h5 class="text-center text-uppercase" style="color: #f9b23e;">player choice = ${history.playerChoice}</h5>
                        <h5 class="text-center text-uppercase" style="color: #f9b23e;"> computer choice = ${history.computerChoice}</h5>
                        <h4 class="text-center mt-3 text-uppercase" style="color: #f9b23e;"> result = ${history.result}</h4>
                        <p class="text-center mt-3"><button type="button" class="btn btn-danger button-delete"
                        id="">Hapus</button></p> 
                    </div>
                </div>
            </div>
            `;
        });
    }
}

const player = new PlayerHuman('jhon')
const comp = new Comp('computer')
const game = new Game(player,comp)

const playerChoice = document.querySelectorAll('.player')
playerChoice.forEach((choice) => {
    choice.addEventListener('click', () => {
        player.playerChoice(choice)
    })
})

this.refresh = document.querySelector('.refresh')
refresh.addEventListener('click', () => {
    game.sendHistory()
    game.refresh()
    game.getHistory()
})

