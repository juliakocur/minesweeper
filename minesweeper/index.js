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

const panel1 = document.createElement('div');
panel1.classList.add('panel1');
panel.appendChild(panel1); 

const panel2 = document.createElement('div');
panel2.classList.add('panel2');
panel.appendChild(panel2); 

const panel3 = document.createElement('div');
panel3.classList.add('panel3');
panel.appendChild(panel3); 

const panel4 = document.createElement('div');
panel4.classList.add('panel4');
panel.appendChild(panel4); 

const panel5 = document.createElement('div');
panel5.classList.add('panel5');
panel.appendChild(panel5); 

const field = document.createElement('div');
field.classList.add('field');
field.classList.add('active');
container.appendChild(field);

const panel1a = document.createElement('div');
panel1a.classList.add('panel1a');
panel1.appendChild(panel1a);

const panel1b = document.createElement('div');
panel1b.classList.add('panel1b');
panel1.appendChild(panel1b);

const movies_text = document.createElement('div');
movies_text.classList.add('movies_text');
movies_text.innerText = 'movies: ';
panel1a.appendChild(movies_text);

const movies = document.createElement('button');
movies.classList.add('movies');
panel1a.appendChild(movies);
movies.innerText = 0;

const time_text = document.createElement('div');
time_text.classList.add('time_text');
time_text.innerText = 'TIME';
panel2.appendChild(time_text);

const time = document.createElement('div');
time.classList.add('time');
panel2.appendChild(time);

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
panel3.appendChild(new_game);
new_game.innerText = 'New\ngame';


const mines_text = document.createElement('div');
mines_text.classList.add('mines_text');
mines_text.innerText = 'mines:  ';
panel1b.appendChild(mines_text);

const mine_count_panel = document.createElement('input');
mine_count_panel.type = 'text';
mine_count_panel.value = 10;
panel1b.appendChild(mine_count_panel);

const form = document.createElement('form');
form.name = 'f1';
panel4.appendChild(form);

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

const night_button = document.createElement('div');
night_button.classList.add('night_mode');
panel4.appendChild(night_button);

const toggle = document.createElement('div');
toggle.classList.add('toggle_circle');
night_button.appendChild(toggle);

const sound_mode = document.createElement('div');
sound_mode.classList.add('sound_mode');
sound_mode.classList.add('on');
panel5.appendChild(sound_mode);

const flag = document.createElement('div');
flag.classList.add('flag');
panel5.appendChild(flag);

const flag_img = document.createElement('div');
flag_img.classList.add('flag_img');
flag.appendChild(flag_img);

const flag_count = document.createElement('button');
flag_count.classList.add('flag_count');
flag.appendChild(flag_count);
flag_count.innerText = 10;


night_button.addEventListener('click', function() {
    toggle.classList.toggle('night');
    body.classList.toggle('night');
    night_button.classList.toggle('night');
    panel.classList.toggle('night');
    field.classList.toggle('night');
    minesweeper.classList.toggle('night');
    time.classList.toggle('night');
    time_text.classList.toggle('night');
    mines_text.classList.toggle('night');
    movies_text.classList.toggle('night');
    if (button) {
    button.classList.toggle('night');
    }
})


let d = [10];
let z = [10];
form_cells.addEventListener("click", function createField() {
    let field_count =document.getElementById('s1').value;
    let field_cells = field_count;
  
    if (field_cells === 'medium') {
      startGame(15, 15, 40);
      resetTime();
      z = 40;
      d = 15;
      field.classList.remove('tw_five');
      field.classList.add('fifteen');
      mine_count_panel.value = 40;
      flag_count.innerText = 40;
      movies.innerText = 0;
    }

    if (field_cells === 'hard') {
        resetTime();
        startGame(25, 25, 99);
        z = 99;
        d = 25;
        field.classList.remove('fifteen');
        field.classList.add('tw_five');
        mine_count_panel.value = 99;
        flag_count.innerText = 99;
        movies.innerText = 0;
    }
    if (field_cells === 'easy') {
        resetTime();
        startGame(10, 10, 10);
        z = 10;
        d = 10;
        field.classList.remove('fifteen');
        field.classList.remove('tw_five');
        mine_count_panel.value = 10;
        flag_count.innerText = 10;
        movies.innerText = 0;
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
    flag_count.innerText = mine_count_panel.value;
    flag_img.classList.remove('put');
})


/*-----------------------------------START GAME---------------------------------------- */

//загрузить бомбы при смене value
function changeBombCount() {
    body.addEventListener('click', function() {

        if (field.classList.contains('active') && mine_count_panel.value !== 10) {
            console.log(z);
            flag_count.innerText = mine_count_panel.value;
            startGame(d, d, mine_count_panel.value);
        }
        if (mine_count_panel.value > 99) {
            mine_count_panel.value = 99;
            flag_count.innerText = 99;
        }
        if (mine_count_panel.value < 10) {
            mine_count_panel.value = 10;
            flag_count.innerText = 10;
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
    let count_flag = bombs_count;
    
    function showBombsCount() {
        mine_count_panel.value = mine_count;
        flag_count.innerText = mine_count;
        flag_count.value = count_flag;
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

        if (cell.className.includes('active')) {
            if (sound_mode.className.includes('on')) { 
            sound('flag');
            }
            cell.classList.remove('active');
            flag_img.classList.remove('put');
            count_flag++;
            flag_count.innerText = count_flag;
            return
        }
       
        if (cell.disabled === true) return;
        cell.disabled = true;

        const count = getBombsCount(row, column);
        if (flag_img.className.includes('put')) {
            count_flag--;
            flag_count.innerText = count_flag;
            if (sound_mode.className.includes('on')) { 
                sound('flag');
            }
            cell.classList.add('active');
            cell.disabled = false;
            return;
        }
        if (cell.className.includes('active')) {
            cell.classList.remove('active');
        }

        if (isBomb(row, column)) {
            cell.innerHTML = '<img class="img_bomb" src ="assets/bomb.png" alt = "mine"></img>';
            if (sound_mode.className.includes('on')) { 
                sound('lose');
            }
            showBombsCount();
            stopTime();
            field.style.pointerEvents='none';
            alert('Game over. Try again');
            return;
        } 

        closed_count--;
        if(closed_count <= bombs_count) {
            let z = Math.floor(s*0.01);
            console.log(z);
            stopTime();
            if (sound_mode.className.includes('on')) { 
                sound('win');
            }
            alert(`Hooray! You found all mines in ${z} seconds and ${click_count} moves!`);
            field.classList.add('active');
            field.style.pointerEvents='none';
            return;
        }

        if (count !== 0) {
            if (sound_mode.className.includes('on')) { 
                sound('click');
            }
            cell.innerHTML = `<img class="img_num" src ="assets/${count}.png" alt = "mine"></img>`;
            return;
        } else {  
            // если каунт 0 то открываю все соседние пустые ячейки
            for (let el of cells){
                el.classList.remove('active');
                count_flag = bombs_count;
                flag_count.innerText = bombs_count;
            }
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

flag_img.addEventListener('click', function(e) {
    if (sound_mode.className.includes('on')) { 
        sound('flag');
    }
    flag_img.classList.toggle('put');
})

sound_mode.addEventListener('click', function() {
    sound_mode.classList.toggle('on');
})

function sound(e) {
    let audio = new Audio();
    audio.autoplay = true;
    audio.src = `assets/${e}.mp3`;
}
