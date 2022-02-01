//Game Constants And Variables
let inputDir = {x:0, y:0};
const food_sound = new Audio('eat.mp3');
const gameOver_sound = new Audio('crash.mp3');
const music_sound = new Audio('music.mp3');
let speed = 12;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:11, y:13}
]
food = {x:5, y:6};
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollapse(snake){
    //if you bump into yourself
    for(let i = 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }   
    //if you bump into wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0){
            return true;
        }
    return false;
}

function gameEngine(){
    //1.Updating the Snake Array and Food
    if(isCollapse(snakeArr)){
            gameOver_sound.play();
            music_sound.pause();
            inputDir = {x: 0, y: 0};
            alert("Game Over, Press Any Key To Continue");
            snakeArr = {x:11, y:13};
            score = 0;
    }
    //If You Have Eaten The Food, Increment The Score And Regenerate The Food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food_sound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        let a = 3;
        let b = 15;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving The Snake
    music_sound.play();
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //2. Display the Snake And Food
    //Display The Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display The Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





//Main Functions Start Here
music_sound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
     inputDir = {x: 0, y: 1} //Start The Game
     switch(e.key){
         case "ArrowUp":
             inputDir.x = 0;
             inputDir.y = -1;
             break;
         case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
             break;
         case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
             break;
         case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
             break;
         default:
             break;    
     }
});
