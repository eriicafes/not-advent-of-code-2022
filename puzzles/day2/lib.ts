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
    Win = "Z",
    Draw = "Y",
    Loss = "X",
}

export interface Outcome {
    opp: OppMove
    result: Result
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
 * Decide my move from outcome.
 */
export const decideMyMove = (outcome: Outcome) => {
    if (outcome.opp === OppMove.Rock) return myMoveFromResultAndOppMove.rock(outcome.result)
    if (outcome.opp === OppMove.Paper) return myMoveFromResultAndOppMove.paper(outcome.result)
    return myMoveFromResultAndOppMove.scissors(outcome.result)
}

const myMoveFromResultAndOppMove = {
    // decide my move from opp rock and result
    rock(result: Result): MyMove {
        if (result === Result.Win) return MyMove.Paper
        if (result === Result.Loss) return MyMove.Scissors
        return MyMove.Rock
    },

    // decide my move from opp paper and result
    paper(result: Result): MyMove {
        if (result === Result.Win) return MyMove.Scissors
        if (result === Result.Loss) return MyMove.Rock
        return MyMove.Paper
    },

    // decide my move from opp scissors and result
    scissors(result: Result): MyMove {
        if (result === Result.Win) return MyMove.Rock
        if (result === Result.Loss) return MyMove.Paper
        return MyMove.Scissors
    },
}

/**
 * Score a round from opp move and my move.
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
 * Score a round from opp move and result.
 */
export const scoreRoundFromOutcome = (outcome: Outcome): [number, MyMove] => {
    const myMove = decideMyMove(outcome)
    let score = 0

    // increment score for move
    if (myMove === MyMove.Rock) score += 1
    if (myMove === MyMove.Paper) score += 2
    if (myMove === MyMove.Scissors) score += 3

    // increment score for result
    if (outcome.result === Result.Win) score += 6
    if (outcome.result === Result.Draw) score += 3
    if (outcome.result === Result.Loss) score += 0

    return [score, myMove]
}

/**
 * Parse input string to moves array.
 */
export const inputToMoves = (input: string) => {
    // split input by new line and trim whitespaces
    const lines = input.split("\n").map(line => line.trim())

    // transform each input line to a move
    const moves = lines.map((line): Move => {
        const [x, y] = line.split(" ", 2) as [unknown, unknown]

        if (isValidOppMove(x) && isValidMyMove(y)) {
            return { opp: x, me: y }
        }
        throw new Error("invalid move")
    })
    return moves
}

/**
 * Parse input string to outcomes array.
 */
export const inputToOutcomes = (input: string) => {
    // split input by new line and trim whitespaces
    const lines = input.split("\n").map(line => line.trim())

    // transform each input line to a move
    const outcomes = lines.map((line): Outcome => {
        const [x, r] = line.split(" ", 2) as [unknown, unknown]

        if (isValidOppMove(x) && isValidResult(r)) {
            return { opp: x, result: r }
        }
        throw new Error("invalid outcome")
    })
    return outcomes
}

function isValidOppMove(move: unknown): move is OppMove {
    return move === OppMove.Rock || move === OppMove.Paper || move === OppMove.Scissors
}

function isValidMyMove(move: unknown): move is MyMove {
    return move === MyMove.Rock || move === MyMove.Paper || move === MyMove.Scissors
}

function isValidResult(result: unknown): result is Result {
    return result === Result.Win || result === Result.Draw || result === Result.Loss
}
