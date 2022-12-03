import { decideMyMove, inputToMoves, inputToOutcomes, Move, MyMove, OppMove, Outcome, pitch, Result, scoreRound, scoreRoundFromOutcome } from "./lib";

describe("parse input to moves", () => {
    it('should parse moves from single-line string', () => {
        expect(inputToMoves("A X")).toStrictEqual<Move[]>([{ opp: OppMove.Rock, me: MyMove.Rock }])
    })

    it('should parse moves from multi-line string', () => {
        expect(inputToMoves(`A X
        B Z`)).toStrictEqual<Move[]>([
            { opp: OppMove.Rock, me: MyMove.Rock },
            { opp: OppMove.Paper, me: MyMove.Scissors },
        ])

        expect(inputToMoves("A X\nC Y")).toStrictEqual<Move[]>([
            { opp: OppMove.Rock, me: MyMove.Rock },
            { opp: OppMove.Scissors, me: MyMove.Paper },
        ])
    })

    it('should fail parsing incorrect input', () => {
        expect(() => inputToMoves("J K")).toThrowError("invalid move")
    })
})

describe("pitch moves", () => {
    // rock
    test('rock draws rock', () => {
        expect(pitch({ opp: OppMove.Rock, me: MyMove.Rock })).toBe<Result>(Result.Draw)
    })

    test('rock beats scissors', () => {
        expect(pitch({ opp: OppMove.Scissors, me: MyMove.Rock })).toBe<Result>(Result.Win)
    })

    test('rock loses to paper', () => {
        expect(pitch({ opp: OppMove.Paper, me: MyMove.Rock })).toBe<Result>(Result.Loss)
    })

    // paper
    test('paper beats rock', () => {
        expect(pitch({ opp: OppMove.Rock, me: MyMove.Paper })).toBe<Result>(Result.Win)
    })

    test('paper loses to scissors', () => {
        expect(pitch({ opp: OppMove.Scissors, me: MyMove.Paper })).toBe<Result>(Result.Loss)
    })

    test('paper draws paper', () => {
        expect(pitch({ opp: OppMove.Paper, me: MyMove.Paper })).toBe<Result>(Result.Draw)
    })

    // scissors
    test('scissors loses to rock', () => {
        expect(pitch({ opp: OppMove.Rock, me: MyMove.Scissors })).toBe<Result>(Result.Loss)
    })

    test('scissors draws scissors', () => {
        expect(pitch({ opp: OppMove.Scissors, me: MyMove.Scissors })).toBe<Result>(Result.Draw)
    })

    test('scissors beats paper', () => {
        expect(pitch({ opp: OppMove.Paper, me: MyMove.Scissors })).toBe<Result>(Result.Win)
    })
})

describe('score moves', () => {
    test("opp rock vs my paper should result in a win with score of 8", () => {
        expect(scoreRound({ opp: OppMove.Rock, me: MyMove.Paper })).toStrictEqual([8, Result.Win])
    })

    test("opp paper vs my rock should result in a loss with score of 1", () => {
        expect(scoreRound({ opp: OppMove.Paper, me: MyMove.Rock })).toStrictEqual([1, Result.Loss])
    })

    test("opp scissors vs my scissors should result in a draw with score of 6", () => {
        expect(scoreRound({ opp: OppMove.Scissors, me: MyMove.Scissors })).toStrictEqual([6, Result.Draw])
    })
})

describe("parse input to outcomes", () => {
    it('should parse outcomes from single-line string', () => {
        expect(inputToOutcomes("A X")).toStrictEqual<Outcome[]>([{ opp: OppMove.Rock, result: Result.Loss }])
    })

    it('should parse outcomes from multi-line string', () => {
        expect(inputToOutcomes(`A X
        B Z`)).toStrictEqual<Outcome[]>([
            { opp: OppMove.Rock, result: Result.Loss },
            { opp: OppMove.Paper, result: Result.Win },
        ])

        expect(inputToOutcomes("A X\nC Y")).toStrictEqual<Outcome[]>([
            { opp: OppMove.Rock, result: Result.Loss },
            { opp: OppMove.Scissors, result: Result.Draw },
        ])
    })

    it('should fail parsing incorrect input', () => {
        expect(() => inputToOutcomes("J K")).toThrowError("invalid outcome")
    })
})

describe("decide my moves", () => {
    // rock
    test("to win opp rock requires paper", () => {
        expect(decideMyMove({ opp: OppMove.Rock, result: Result.Win })).toStrictEqual(MyMove.Paper)
    })

    test("to draw with opp rock requires rock", () => {
        expect(decideMyMove({ opp: OppMove.Rock, result: Result.Draw })).toStrictEqual(MyMove.Rock)
    })

    test("to lose to opp rock requires scissors", () => {
        expect(decideMyMove({ opp: OppMove.Rock, result: Result.Loss })).toStrictEqual(MyMove.Scissors)
    })

    // paper
    test("to win opp paper requires scissors", () => {
        expect(decideMyMove({ opp: OppMove.Paper, result: Result.Win })).toStrictEqual(MyMove.Scissors)
    })

    test("to draw with opp paper requires paper", () => {
        expect(decideMyMove({ opp: OppMove.Paper, result: Result.Draw })).toStrictEqual(MyMove.Paper)
    })

    test("to lose to opp paper requires rock", () => {
        expect(decideMyMove({ opp: OppMove.Paper, result: Result.Loss })).toStrictEqual(MyMove.Rock)
    })

    // scissors
    test("to win opp scissors requires rock", () => {
        expect(decideMyMove({ opp: OppMove.Scissors, result: Result.Win })).toStrictEqual(MyMove.Rock)
    })

    test("to draw with opp scissors requires scissors", () => {
        expect(decideMyMove({ opp: OppMove.Scissors, result: Result.Draw })).toStrictEqual(MyMove.Scissors)
    })

    test("to lose to opp scissors requires paper", () => {
        expect(decideMyMove({ opp: OppMove.Scissors, result: Result.Loss })).toStrictEqual(MyMove.Paper)
    })
})

describe('score outcomes', () => {
    test("opp rock and draw result will require my move of rock with score of 4", () => {
        expect(scoreRoundFromOutcome({ opp: OppMove.Rock, result: Result.Draw })).toStrictEqual([4, MyMove.Rock])
    })

    test("opp paper and loss result will require my move of rock with score of 1", () => {
        expect(scoreRoundFromOutcome({ opp: OppMove.Paper, result: Result.Loss })).toStrictEqual([1, MyMove.Rock])
    })

    test("opp scissors and win result will require my move of rock with score of 7", () => {
        expect(scoreRoundFromOutcome({ opp: OppMove.Scissors, result: Result.Win })).toStrictEqual([7, MyMove.Rock])
    })
})
