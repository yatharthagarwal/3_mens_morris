from exceptions import *
from constants import *

games = {}
modes = {}

def get_game(game_id):
    try:
        return games[game_id]
    except KeyError as ke:
        raise GameNotFoundException(f"Game {game_id} not found.")

def get_mode(game_id):
    try:
        return modes[game_id]
    except KeyError as ke:
        raise GameNotFoundException(f"Game {game_id} not found.")

def add_game(game, mode):
    games[game.id] = game
    modes[game.id] = mode
    print(games)
    print(modes)
    print(games[0])
    print(modes[0])