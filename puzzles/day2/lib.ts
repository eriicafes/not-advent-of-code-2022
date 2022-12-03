export enum OppMove {
    Rock = "A",
    Paper = "B",
    Scissors = "C",
}

export enum MyMove {
    Rock = "X",
    Paper = "Y",
    Scissors = "Z",
}

export interface Move {
    opp: OppMove
    me: MyMove
}

export enum Result {
    Win,
    Draw,
    Loss,
}

/**
 * Pitch my move against opp move.
 */
export const pitch = (move: Move) => {
    if (move.opp === OppMove.Rock) return pitchWithOppMove.rock(move.me)
    if (move.opp === OppMove.Paper) return pitchWithOppMove.paper(move.me)
    return pitchWithOppMove.scissors(move.me)
}

const pitchWithOppMove = {
    // pitch opp rock against my move
    rock(me: MyMove): Result {
        if (me === MyMove.Paper) return Result.Win
        if (me === MyMove.Scissors) return Result.Loss
        return Result.Draw
    },

    // pitch opp paper against my move
    paper(me: MyMove): Result {
        if (me === MyMove.Rock) return Result.Loss
        if (me === MyMove.Scissors) return Result.Win
        return Result.Draw
    },

    // pitch opp scissors against my move
    scissors(me: MyMove): Result {
        if (me === MyMove.Rock) return Result.Win
        if (me === MyMove.Paper) return Result.Loss
        return Result.Draw
    },
}

/**
 * Score a round.
 */
export const scoreRound = (move: Move): [number, Result] => {
    const result = pitch(move)
    let score = 0

    // increment score for move
    if (move.me === MyMove.Rock) score += 1
    if (move.me === MyMove.Paper) score += 2
    if (move.me === MyMove.Scissors) score += 3

    // increment score for result
    if (result === Result.Win) score += 6
    if (result === Result.Draw) score += 3
    if (result === Result.Loss) score += 0

    return [score, result]
}

/**
 * Parse input string to moves array.
 */
export const inputToMoves = (input: string) => {
    // split input by new line and trim whitespaces
    const lines = input.split("\n").map(line => line.trim())

    // transform each input line to a move
    const pitches = lines.map((line): Move => {
        const [x, y] = line.split(" ", 2) as [unknown, unknown]

        if (isValidOppMove(x) && isValidMyMove(y)) {
            return { opp: x, me: y }
        }
        throw new Error("invalid moves")
    })
    return pitches
}

function isValidOppMove(move: unknown): move is OppMove {
    return move === OppMove.Rock || move === OppMove.Paper || move === OppMove.Scissors
}

function isValidMyMove(move: unknown): move is MyMove {
    return move === MyMove.Rock || move === MyMove.Paper || move === MyMove.Scissors
}
