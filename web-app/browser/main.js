import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;

let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);

const grid = document.getElementById("grid");

//to define aside in main.js
//const aside = document.getElementById("aside");

const up_next_grid_columns = Tetris.mini_field_width;
const up_next_grid_rows = Tetris.mini_field_height;

document.documentElement.style.setProperty("--up_next_grid-rows", up_next_grid_rows);
document.documentElement.style.setProperty("--up_next_grid-columns", up_next_grid_columns);

const up_next_grid = document.getElementById("up_next_grid");

const held_grid_columns = Tetris.mini_field_width;
const held_grid_rows = Tetris.mini_field_height;

document.documentElement.style.setProperty("--held_grid-rows", held_grid_rows);
document.documentElement.style.setProperty("--held_grid-columns", held_grid_columns);

const held_grid = document.getElementById("held_grid");


const range = (n) => Array.from({"length": n}, (ignore, k) => k);

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";

    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});


const update_grid = function () {
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });


    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );

};


const up_next_cells = range(up_next_grid_rows).map(function () {
    const up_next_row = document.createElement("div");
    up_next_row.className = "up_next_row";

    const up_next_rows = range(up_next_grid_columns).map(function () {
        const up_next_cell = document.createElement("div");
        up_next_cell.className = "up_next_cell";

        up_next_row.append(up_next_cell);

        return up_next_cell;
    });

    up_next_grid.append(up_next_row);
    return up_next_rows;
});


const update_up_next_grid = function () {
    up_next_cells.forEach(function (line) {
        line.forEach(function (cell) {
            cell.className = `up_next_cell`;
        });
    });

    Tetris.tetromino_coordiates(game.next_tetromino,[2,2]).forEach(
        function (coord) {
            try {
                const up_next_cell = up_next_cells[coord[1]][coord[0]];
                up_next_cell.className = (
                    `up_next_cell current ${game.next_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
};


const held_cells = range(held_grid_rows).map(function () {
    const held_row = document.createElement("div");
    held_row.className = "held_row";

    const held_rows = range(held_grid_columns).map(function () {
        const held_cell = document.createElement("div");
        held_cell.className = "held_cell";

        held_row.append(held_cell);

        return held_cell;
    });

    held_grid.append(held_row);
    return held_rows;
});


const update_held_grid = function () {
    held_cells.forEach(function (line) {
        line.forEach(function (cell) {
            cell.className = `held_cell`;
        });
    });

    Tetris.tetromino_coordiates(game.held_tetromino,[1,2]).forEach(
        function (coord) {
            try {
                const held_cell = held_cells[coord[1]][coord[0]];
                held_cell.className = (
                    `held_cell current ${game.held_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
};


// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    // when c key pressed the piece is held
    if (event.key === "c") {
        game = Tetris.hold(game);
    }

    update_grid();
    update_up_next_grid();
    update_held_grid();
};


const timer_function = function () {
    game = Tetris.next_turn(game);
    update_grid();
    setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);


update_grid();
update_up_next_grid();
update_held_grid();