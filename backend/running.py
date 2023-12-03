from flask import Blueprint, request, jsonify
from http import HTTPStatus
from constants import *
from game import Game
from player import Player

running_bp = Blueprint("running", __name__)

@running_bp.route("/running/save_game", methods=["POST"])
def save_game():
    try:
        data = request.get_json()
        state = data['state']

        white_time = data['white_time']
        white_pieces_remaining = data['white_pieces_remaining']
        white_positions = data['white_positions']
        white = Player(white_time, white_pieces_remaining, white_positions)

        black_time = data['black_time']
        black_pieces_remaining = data['black_pieces_remaining']
        black_positions = data['black_positions']
        black = Player(black_time, black_pieces_remaining, black_positions)

        for pos in white_positions:
            if pos in black_positions:
                raise InvalidStateException(f"Overlapping positions. White positions: {white_positions}, Black positions: {black_positions}.")

        game = Game(white, black, state)

        save_code = game.get_save_code()
        response_data = {'save_code': f"{save_code}"}
        return jsonify(response_data), HTTPStatus.CREATED

    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), HTTPStatus.BAD_REQUEST