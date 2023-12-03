from constants import *
from exceptions import *

class Player:
    def __init__(
        self,
        time_remaining,
        pieces_remaining,
        positions = []
    ):
        self.time_remaining = time_remaining
        self.pieces_remaining = pieces_remaining
        self.positions = positions

        if pieces_remaining < 0:
            raise InvalidStateException(f"Invalid pieces. Remaining: {pieces_remaining}.")

        total_pieces = pieces_remaining + len(positions)
        if total_pieces != INITIAL_PIECES:
            raise InvalidStateException(f"Invalid state. Total pieces for player: {total_pieces}.")