from flask import jsonify
from constants import *

class Game:
    def __init__(self, white, black, state = WHITE_NORMAL):
        self.white = white
        self.black = black
        self.state = state

    def get_save_code(self):
        cells = [EMPTY for _ in range(24)]
        for pos in self.white.positions:
            cells[pos] = WHITE

        for pos in self.black.positions:
            cells[pos] = BLACK

        cell_info = ""
        for i in range(0, 24):
            cell_info += str(cells[i])

        code = cell_info
        code += ":"
        code += str(self.state)
        code += ":"
        code += str(self.white.time_remaining)
        code += ":"
        code += str(self.white.pieces_remaining)
        code += ":"
        code += str(self.black.time_remaining)
        code += ":"
        code += str(self.black.pieces_remaining)
 
        return code
    
    def get_json(self):
        data = {}
        data['state'] = self.state

        data['white_time'] = self.white.time_remaining
        data['white_pieces_remaining'] = self.white.pieces_remaining
        data['white_positions'] = [pos + 1 for pos in self.white.positions]

        data['black_time'] = self.black.time_remaining
        data['black_pieces_remaining'] = self.black.pieces_remaining
        data['black_positions'] = [pos + 1 for pos in self.black.positions]

        response = jsonify(data)
        return response