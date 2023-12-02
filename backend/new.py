from flask import Blueprint, request, jsonify
from http import HTTPStatus
from common import *
from exceptions import *
from game import Game

new_bp = Blueprint("new", __name__)

@new_bp.route("/new/create_game", methods=["POST"])
def create_game():
    try:
        data = request.get_json()
        mode = data['mode']
        mode = int(mode)
        if mode not in [ONE_PLAYER, TWO_PLAYER]:
            raise InvalidGameModeException(f"Invalid game mode: {mode}.")

        individual_time = data.get('individual_time', DEFAULT_TIME_SEC)
        individual_time = int(individual_time)

        game = Game.new_game(individual_time)
        add_game(game, mode)

        response = {'id': game.id}
        return jsonify(response), HTTPStatus.CREATED

    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), HTTPStatus.BAD_REQUEST        

@new_bp.route("/new/resume_game", methods=["POST"])
def resume_game():
    try:
        data = request.get_json()
        code = data['code']

        info = code.split(':')
        cell_info = list(info[0])
        if len(cell_info) != TOTAL_CELLS:
            raise InvalidStateException(f"Cells: {len(cell_info)}.")
        for cell_type in cell_info:
            cell_type = int(cell_type)
            if cell_type not in [EMPTY, WHITE, BLACK]:
                raise InvalidStateException(f"Invalid cell type: {cell_type}.")

        state = int(info[1])
        if state < 0 or state >= 10:
            raise InvalidStateException(f"Invalid state info passed. {state}")


        white_time = int(info[2])
        white_pieces_remaining = int(info[3])
        white_pieces_captured = int(info[4])
        white_positions = [i for (i, cell_type) in enumerate(cell_info) if int(cell_type) == WHITE]
        white = Player(white_time, white_pieces_remaining, white_pieces_captured, white_positions)
        
        black_time = int(info[5])
        black_pieces_remaining = int(info[6])
        black_pieces_captured = int(info[7])
        black_positions = [i for (i, cell_type) in enumerate(cell_info) if int(cell_type) == BLACK]
        black = Player(black_time, black_pieces_remaining, black_pieces_captured, black_positions)

        game = Game(white, black, state)
        mode = info[8]
        mode = int(mode)
        if mode not in [ONE_PLAYER, TWO_PLAYER]:
            raise InvalidGameModeException(f"Invalid game mode: {mode}.")
            
        add_game(game, mode)

        response = {'id': game.id}
        return jsonify(response), HTTPStatus.CREATED

    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), HTTPStatus.BAD_REQUEST