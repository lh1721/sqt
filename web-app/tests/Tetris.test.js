import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `Hold can't be performed twice in a row:
        Given a Tetris Game where a Hold is performed;
        When one further Hold is performed;
        Then the game state before and after the second hold, is the same.`,
        function () {

            const initial_game = Tetris.new_game();
            //const initial_piece = initial_game.current_tetromino;
            const next_game = Tetris.hold(initial_game);

            // You'll need to implement Tetris.hold before this works.
            const next_piece = initial_game.current_tetromino;
            const third_game = Tetris.hold(next_game);
            const third_piece = third_game.current_tetromino;
            if (!R.equals(next_piece, third_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(next_piece)}
                    Final:   ${JSON.stringify(third_piece)}`
                );
            }
        }
    );

    it(
        `If there is no held piece and a hold performed,
        the next tetromino is depolyed:
        Given a Tetris game where Hold has not yet been performed;
        When a Hold is performed
        Then the game state is changed from before holding,
        as the next tetromino is deployed`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            const next_game = Tetris.hold(initial_game);

            const third_piece = next_game.next_tetromino;
            if (R.equals(initial_piece, third_piece)) {
                throw new Error(
                    `The inital and final tetrominos do match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(third_piece)}`
                );
            }
        }
    );

});