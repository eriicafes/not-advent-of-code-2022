import { inputToMoves, Move, MyMove, OppMove, pitch, Result, scoreRound } from "./lib";

describe("parse input", () => {
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
        expect(() => inputToMoves("J K")).toThrowError("invalid moves")
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

describe('score', () => {
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
