const body = document.body;
const button = document.querySelector('.button');

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

const panel = document.createElement('div');
panel.classList.add('panel');
container.appendChild(panel);

const field = document.createElement('div');
field.classList.add('field');
container.appendChild(field);

startGame(10, 10, 10);

function startGame(w, h, bombs_count) {
    const cells_count = w * h; 
    field.innerHTML = '<button class="button"></button>'.repeat(cells_count);
    //все дети-ячейки field
    const cells = [...field.children];

    let closed_count = cells_count;
    let click_count = 0;

    //массив с индексами бомб
    const bombs = [...Array(cells_count).keys()].sort(() => Math.random() - 0.5).slice(0, bombs_count);
    
    field.addEventListener('click', (e) => {
        click_count++;
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
            field.style.pointerEvents='none';
            return;
        } 

        closed_count--;
        if(closed_count <= bombs_count) {
            alert(`Hooray! You found all mines in ## seconds and ${click_count} moves!`);
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