import { readInput } from "../../utils/input"
import { inputToMoves, scoreRound } from "./lib"

async function main() {
    // read input
    const input = await readInput({ day: 2, example: false })

    // convert input to moves array
    const moves = inputToMoves(input)

    // calculate score from moves
    const score = moves.reduce((total, move) => {
        const [score] = scoreRound(move)
        return total + score
    }, 0)

    console.log("score:", score)
}
main()
