const Labyrinth = document.querySelector('.my-labyrinth');
const messageDiv = document.querySelector('.message-div');
let LabSize = 20;
let x = 0;
let y = 0;
let life = 3;
let myLab = [];

for(let i=0; i<LabSize; i++){
    let myRow = [];
    for(let j=0; j<LabSize; j++){
        let myBox = {
            'l': false,
            'r': false,
            't': false,
            'b': false,
            'p': false,
            'bomb': false,
        }
        // définition du mur de gauche
        if(j === 0){
            myBox.l = true;
        }else{
            if(myRow[j-1].r){
                myBox.l = true;
            }
        }
        // définition du mur du haut
        if(i=== 0){
            myBox.t = true;
        }else{
            if(myLab[i-1][j].b){
                myBox.t = true;
            }
        }
        // définition du mur de droite
        if(j === LabSize-1){
            myBox.r = true;
        }else{
            if(Math.random() > 0.5){
                myBox.r = true;
            }
        }
        // définition du mur du bas
        if(i=== LabSize-1){
            myBox.b = true;
        }else{
            if(!myBox.r){
                if(Math.random()> 0.5){
                    myBox.b = true;
                }
            }            
        }
        // ajout des bombes
        let myRand = (Math.random().toFixed(2))*100;
        console.log(myRand);
        if(myRand < 10 && (j!= 0 && i!=0)){
            console.log(i+' '+j);
            console.log(myRand < 10);
            myBox.bomb = true;
        }
        if(j === x && i === y){
            myBox.p = true;
        }
        myRow.push(myBox);
    }
    myLab.push(myRow);
}









showLab();
function showLab(){
    Labyrinth.innerHTML = '';
    for (const line of myLab) {
        let myRow = document.createElement('div');
        myRow.classList.add('line');
        for (const box of line) {
            let myBox = document.createElement('div');
            myBox.classList.add('box');
            if (box.b) {
                myBox.style.borderBottom = "2px solid darkred";
            }
            if (box.t) {
                myBox.style.borderTop = "2px solid darkred";
            }
            if (box.l) {
                myBox.style.borderLeft = "2px solid darkred";
            }
            if (box.r) {
                myBox.style.borderRight = "2px solid darkred";
            }
            if (box.p) {
                myBox.innerHTML = '<i class="fa-solid fa-person"></i>';
            }else if(box.bomb){
                myBox.innerHTML = '<i class="fa-solid fa-bomb" style="color: #c06c35;"></i>'
            }else {
                myBox.innerHTML = '';
            }
            myRow.append(myBox);
        }
        Labyrinth.append(myRow);
    }
    let myBoxes = document.querySelectorAll('.box');
    let lastIndex = myBoxes.length - 1;
    myBoxes[lastIndex].classList.add('arrivee');
    if(life == 0){
        messageDiv.innerHTML = '<h2>Vous êtes mort !</h2>';
    }else{
        let hearts = '';
        for(i=0; i<life; i++){
        hearts += '<i class="fa-solid fa-heart" style="color: #ff0000;"></i>'
        }
        messageDiv.innerHTML = hearts;
    }
    
}





document.addEventListener('keydown', (e) => {
    if ((e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'ArrowUp')&& !(x === LabSize-1 && y === LabSize-1) && life > 0) {
        console.log(e.code);

        switch (e.code) {
            case 'ArrowLeft':
                if (!(myLab[y][x].l) && !(myLab[y][x-1].r)){
                    myLab[y][x].p = false;
                    x = x - 1;
                    myLab[y][x].p = true;
                    if(myLab[y][x].bomb){
                        life --;
                        myLab[y][x].bomb = false;
                    }
                    showLab();
                }
                break;
            case 'ArrowRight':
                if (!(myLab[y][x].r) && !(myLab[y][x+1].l)){
                    myLab[y][x].p = false;
                    x = x + 1;
                    myLab[y][x].p = true;
                    if(myLab[y][x].bomb){
                        life --;
                        myLab[y][x].bomb = false;
                    }
                    showLab();
                }
                break;
            case 'ArrowDown':
                if (!(myLab[y][x].b) && !(myLab[y+1][x].t)){
                    myLab[y][x].p = false;
                    y = y + 1;
                    myLab[y][x].p = true;
                    if(myLab[y][x].bomb){
                        life --;
                        myLab[y][x].bomb = false;
                    }
                    showLab();
                }
                break;
            case 'ArrowUp':
                if (!(myLab[y][x].t) && !(myLab[y-1][x].b)){
                    myLab[y][x].p = false;
                    y = y - 1;
                    myLab[y][x].p = true
                    if(myLab[y][x].bomb){
                        life --;
                        myLab[y][x].bomb = false;s
                    }
                    showLab();
                }
                break;
        }
        
        
        if(x === LabSize-1 && y === LabSize-1){
            messageDiv.innerHTML = 'Vous êtes arrivé à la sortie !';
        }
    }
});
