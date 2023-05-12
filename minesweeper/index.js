const body = document.body;
const button = document.querySelector('.button');

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

const minesweeper = document.createElement('h1');
container.appendChild(minesweeper);
minesweeper.innerText = 'MINESWEEPER';

const panel = document.createElement('div');
panel.classList.add('panel');
container.appendChild(panel);

const field = document.createElement('div');
field.classList.add('field');
field.classList.add('active');
container.appendChild(field);

const movies = document.createElement('button');
movies.classList.add('movies');
panel.appendChild(movies);
movies.innerText = 0;

const time = document.createElement('div');
time.classList.add('time');
panel.appendChild(time);

const minutes = document.createElement('span');
minutes.classList.add('minutes');
time.appendChild(minutes);
minutes.innerText = '00';

const colon = document.createElement('span');
colon.classList.add('colon');
time.appendChild(colon);
colon.innerText = ':'

const seconds = document.createElement('span');
seconds.classList.add('seconds');
time.appendChild(seconds);
seconds.innerText = '00';

const new_game = document.createElement('button');
new_game.classList.add('new_game');
panel.appendChild(new_game);
new_game.innerText = 'New game';


const mine_count_panel = document.createElement('input');
mine_count_panel.type = 'text';
mine_count_panel.value = 10;
panel.appendChild(mine_count_panel);

const form = document.createElement('form');
form.name = 'f1';
panel.appendChild(form);

const form_cells = document.createElement('select');
form_cells.name = 'cells';
form_cells.id = 's1';
form.appendChild(form_cells);

const option10 = document.createElement('option');
option10.innerText = 'easy';
form_cells.appendChild(option10);

const option15 = document.createElement('option');
option15.innerText = 'medium';
form_cells.appendChild(option15);

const option25 = document.createElement('option');
option25.innerText = 'hard';
form_cells.appendChild(option25);

const input_button = document.createElement('input');
input_button.type = 'button';
input_button.innerText = 'ok';
form_cells.appendChild(input_button);




let d = [10];
let z = [10];
form_cells.addEventListener("click", function createField() {
    let field_count =document.getElementById('s1').value;
    let field_cells = field_count;
  
    if (field_cells === 'medium') {
      startGame(15, 15, 40);
      z = 40;
      d = 15;
      field.classList.remove('tw_five');
      field.classList.add('fifteen');
      mine_count_panel.value = 40;
    }

    if (field_cells === 'hard') {
        startGame(25, 25, 99);
        z = 99;
        d = 25;
        field.classList.remove('fifteen');
        field.classList.add('tw_five');
        mine_count_panel.value = 99;
    }
    if (field_cells === 'easy') {
        startGame(10, 10, 10);
        z = 10;
        d = 10;
        field.classList.remove('fifteen');
        field.classList.remove('tw_five');
        mine_count_panel.value = 10;
    }
    })



/*-------------------------------------TIME------------------------------------------ */
let interval;
let min = 0;
let sec = 0;
let ms = 0;
let s = 0;

let seconds_count;

const startTimer = () => {
    ms++;
    s++;
    if (ms > 99) {
        sec++;
        seconds.innerHTML = '0' + sec;
        ms = 0;
    }
    if (sec > 9) {
        seconds.innerHTML = sec;
    }
    if (sec > 59) {
        min++;
        minutes.innerHTML = '0' + min;

        sec = 0;
        seconds.innerHTML = '0' + sec;
    }
    if (min > 9) {
        min.innerHTML = min;
    }
}

function createTime() {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
};

function resetTime() {
    clearInterval(interval);
    min = 0;
    sec = 0;
    ms = 0;

    minutes.innerHTML = '00';
    seconds.innerHTML = '00'
}

function stopTime() {
    clearInterval(interval);
}


new_game.addEventListener('click', () => {
    resetTime();
    startGame(d, d, changeBombCount());
    field.style.pointerEvents='auto';
    movies.innerText = '0';
})

/*-----------------------------------START GAME---------------------------------------- */

//загрузить бомбы при смене value
function changeBombCount() {
    body.addEventListener('click', function() {
       
        if (field.classList.contains('active') && mine_count_panel.value !== 10) {
            console.log(z);
            startGame(d, d, mine_count_panel.value);
        }
        if (mine_count_panel.value > 99) {
            mine_count_panel.value = 99;
        }
        if (mine_count_panel.value < 10) {
            mine_count_panel.value = 10;
        }
    })
    return mine_count_panel.value;
}
changeBombCount();


startGame(d, d, mine_count_panel.value);

function startGame(w, h, bombs_count) {
       
    const cells_count = w * h; 
    field.innerHTML = '<button class="button"></button>'.repeat(cells_count);
    //все дети-ячейки field
    const cells = [...field.children];

    let closed_count = cells_count;
    let click_count = 0;
    let mine_count = bombs_count;


    
    function showBombsCount() {
        mine_count_panel.value= mine_count;
    }

    //массив с индексами бомб
    const bombs = [...Array(cells_count).keys()].sort(() => Math.random() - 0.5).slice(0, bombs_count);
   console.log(bombs);

    field.addEventListener('click', (e) => {
        field.classList.remove('active');
        createTime();
        click_count++;
        movies.innerText = click_count;
        //если клик мимо поля
        if (e.target.tagName !== 'BUTTON') {
            return;
        }
        
        const index = cells.indexOf(e.target);
        const column = index % w;
        const row = Math.floor(index / w);

        openCells(row, column)
    });

    function getBombsCount(row, column) {
        //проверяю все соседние ячейки на наличие бомб
        let count = 0;
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                // проверяю все соседние ячейки которые отличаются
                if(isBomb(row + j, column + i)) {
                    count ++
                }
            }
        }
      return count
    }

    function isValid(row, column) {
        return row >= 0 && row < h && column >= 0 && column < w;
    }

    function openCells(row, column) {
        if (!isValid(row, column)) return;
  
        const index = row * w + column;
        const cell = cells[index];
       
        if (cell.disabled === true) return;
        cell.disabled = true;

    
        const count = getBombsCount(row, column);
        if (isBomb(row, column)) {
            
            cell.innerHTML = '<img class="img_bomb" src ="assets/bomb.png" alt = "mine"></img>';
            alert('Game over. Try again');
            showBombsCount();
            stopTime();
            field.style.pointerEvents='none';
           // field.classList.add('active');
            return;
        } 

        closed_count--;
        if(closed_count <= bombs_count) {
            let z = Math.floor(s*0.01);
            console.log(z);
            stopTime();
            alert(`Hooray! You found all mines in ${z} seconds and ${click_count} moves!`);
            field.classList.add('active');
            field.style.pointerEvents='none';
            return;
        }

        if (count !== 0) {
            cell.innerHTML = `<img class="img_num" src ="assets/${count}.png" alt = "mine"></img>`;
            return;
        } else {     
            // если каунт 0 то открываю все соседние пустые ячейки
            for (let i=-1; i<=1; i++) {
                for (let j=-1; j<=1; j++) {
                    openCells(row + j, column + i); 
                }
            }
        }
    }

    function isBomb(row, column) {
        if (!isValid(row,column)) {
            return false
        }
        //вычисляю индекс по ряду колонки
        const index = row * w +  column;
        return bombs.includes(index);
    }
    
}
