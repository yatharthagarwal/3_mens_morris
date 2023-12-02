from constants import *
from exceptions import *

class Player:
    def __init__(
        self,
        time_remaining = DEFAULT_TIME_SEC,
        pieces_remaining = INITIAL_PIECES,
        pieces_captured = 0,
        positions = []
    ):
        self.time_remaining = time_remaining
        self.pieces_remaining = pieces_remaining
        self.pieces_captured = pieces_captured
        self.positions = positions

        if min(pieces_remaining, pieces_captured) < 0:
            raise InvalidStateException(f"Invalid pieces. Remaining: {pieces_remaining}, captured: {pieces_captured}.")

        total_pieces = pieces_remaining + pieces_captured + len(positions)
        if total_pieces != INITIAL_PIECES:
            raise InvalidStateException(f"Invalid state. Total pieces for player: {total_pieces}.")

    def update_time_remaining(self, time_remaining):
        if time_remaining > self.time_remaining:
            raise TimeFlowException(f"Current remaining time: {self.time_remaining}, Requested remaining time: {time_remaining}.")
        self.time_remaining = time_remaining