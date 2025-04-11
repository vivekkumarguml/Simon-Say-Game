// ============================  EVENT BUBBLING===========================
// let div=document.querySelector("div");
// let ul=document.querySelector("ul");
// let lis=document.querySelectorAll("li");



// div.addEventListener('click',function(){
//     console.log("Div was clicked");
// });
// ul.addEventListener('click',function(event){
//     event.stopPropagation()
//     console.log("ul was clicked");
// });

// for(li of lis){
//     li.addEventListener('click',function(event){
//         event.stopPropagation();
//     console.log("li was clicked");
// });
// }


// ========================= TODO APP====================
// let btn=document.querySelector("button");
// let ul=document.querySelector("ul");
// let inp=document.querySelector("input");

// btn.addEventListener("click",function(){
//     let  item=document.createElement("li");
//     item.innerText=inp.value;

//     let delBtn=document.createElement("button");
//     delBtn.innerText=" delete";
//     delBtn.classList.add("delete")

//     item.appendChild(delBtn);   
//     ul.appendChild(item); 
//     //console.log(inp.value);
//     inp.value="";
// });

// ul.addEventListener("click",function(event){
//      if(event.target.nodeName =="BUTTON"){
//         let listItem = event.target.parentElement;
//         listItem.remove();
//         console.log("deleted");
//      }
// })







                // +++++++++++++++++++  ONLY DELETE THE ELEMENT WICH ARE ALREADY PRESNT ON THE  HTML FILES +++++++++++++++++++++
                // THE PROPERTIES WHICH ARE ADDED BY THE EVETLISTENER ARE NOT DELETED 


// let delBtns=document.querySelectorAll(".delete");
// for(delBtn of delBtns){
//     delBtn.addEventListener("click",function(){
//        // console.log("element deleted");
//        let par=this.parentElement;
//        console.log(par);
//        par.remove();
//     })
// }









// ==================== SIMON SAY GAME===============================
let gameSeq=[];
let userSeq=[];
let higestScore=0;

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function checkAns(idx){
    //console.log("Current level:",level);
   // let idx = level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        higestScore = highScore();
        h2.innerHTML = `Game Over!!!  Your score was <b>${level}</b>  <br> HIGEST SORE : ${higestScore}  <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white"; 
        },150);
        reset();
    }
}


function btnPress(){
   //console.log(this);
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userColor);

     checkAns(userSeq.length-1);
    //checkAns();
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq =[];
    userSeq = [];
    level = 0; 
}
function highScore(){
    return Math.max(level,higestScore )
}