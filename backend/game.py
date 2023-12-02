from constants import *
from common import *
from player import Player

game_count = 0

class Game:
    def __init__(self, white, black, state = SETUP_WHITE_NORMAL):
        global game_count
        self.id = game_count
        game_count += 1

        self.white = white
        self.black = black
        self.state = state

    def update_white_time(self, time_remaining):
        self.white.update_time_remaining(time_remaining)

    def update_black_time(self, time_remaining):
        self.black.update_time_remaining(time_remaining)

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
        code += str(self.white.pieces_captured)
        code += ":"
        code += str(self.black.time_remaining)
        code += ":"
        code += str(self.black.pieces_remaining)
        code += ":"
        code += str(self.black.pieces_captured)
        code += ":"
        code += str(get_mode(self.id))
 
        return code
    
    @staticmethod
    def new_game(individual_time = DEFAULT_TIME_SEC):
        return Game(Player(individual_time), Player(individual_time))