from flask import Blueprint, request, jsonify
from http import HTTPStatus
from constants import *
from common import *

running_bp = Blueprint("running", __name__)

@running_bp.route("/running/save_game", methods=["GET"])
def save_game():
    try:
        game_id = request.args['id']
        game_id = int(game_id)
        game = get_game(game_id)

        if 'white_time' in request.args:
            white_time = request.args['white_time']
            white_time = int(white_time)
            game.update_white_time(white_time)

        if 'black_time' in request.args:
            black_time = request.args['black_time']
            black_time = int(black_time)
            game.update_black_time(black_time)

        save_code = game.get_save_code()
        response_data = {'save_code': f"{save_code}"}
        return jsonify(response_data), HTTPStatus.OK

    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), HTTPStatus.BAD_REQUEST