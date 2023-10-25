function Manual() {
    return (
        <div>
            <h3>Manual</h3>
            <div>Standard Rules
                Each player has nine pieces (hence the name, Nine Men's Morris) which are placed and moved on the line crossings of the board. Whenever three pieces of the same color are placed in a straight row, a mill is closed and one opponent piece may be removed. The goal of the game is to reduce the opponent to only two pieces (such that he cannot form a mill anymore), or to surround the opponent pieces in such a way that there are no valid moves for the opponent.

                The game proceeds in three distinct phases (opening, midgame, and endgame). Unlike chess, these phases are distinguished by special rules for each phase.
                Opening - Setting pieces
                The white player begins. Each player places one piece on an unoccupied position on the board in turns. If a mill is closed by setting a piece, the player may take one of the opponent's pieces. Once all pieces are set, the midgame starts.
                Midgame - Moving pieces
                Each player moves one piece along the lines to a free, neighboring position. Again, if the move results in closing a mill, one of the opponent's pieces may be removed. Note that a player must move a piece in each turn. If there is no legal move, the player has lost.
                Endgame - Flying
                If a player has only three pieces left, he my jump (or fly) with one piece to any unoccupied position instead of moving only along the board lines.

                Rule Details and Game Variations
                Some of these rules are often interpreted differently, such that a variety of rule variants exist. This game tries to support most of them. In particular, the following rule variations are supported:

                    Taking from opponent mills: when a mill is closed, one opponent stone may be taken. However, usually, it is not allowed to take a piece from an opponent's mill, if he still has pieces that are not part of a mill. If you want, you can also allow to take pieces from an opponent's mill. Note that you can always take pieces from an opponent's mill, if all of his pieces are within mills.
                    Multiple mills: in the setting phase, it may happen that two mills are closed simultaneously. In the multiple-mills variations, the player may take two opponent pieces, in this case.
                    Flying: some people prefer to omit the flying rule, such that only standard moves may be conducted, even when a player is down to only three pieces.
                    Lasker variant (proposed by the chess grandmaster Emanuel Lasker): there is no difference between opening and midgame. I.e., a player may decide to move a piece instead of setting a new piece. Usually, this variant is played with 10 pieces instead of only 9.
                    Remis: if the same board situation appeared for N times (with N usually 3), the game is declared remis. 

                AI algorithm

                The AI algorithm is a standard alpha-beta search in a NegaMax implementation using iterative deepening. It employs a transposition table to quickly find previously computed positions.

                A special feature is the automatic learning capability: whenever the computer wins or loses a game, it will prefer to obtain or avoid similar situations in the future. This results in a better long-term motivation, since the computer will not make the same mistake twice and the gameplay will be more randomized.

                The evaluation function is still quite basic and consists of four parts:

                    material: the number of pieces each player has left
                    freedom: the number of possible moves a player can conduct
                    mills: the number of closed mills
                    experience: the learning-bias from previous games
                </div>
        </div>
    )
}

export default Manual;