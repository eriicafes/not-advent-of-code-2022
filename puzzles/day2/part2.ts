import { readInput } from "../../utils/input"
import { inputToOutcomes, scoreRoundFromOutcome } from "./lib"

async function main() {
    // read input
    const input = await readInput({ day: 2, example: false })

    // convert input to moves array
    const outcomes = inputToOutcomes(input)

    // calculate score from outcomes
    const score = outcomes.reduce((total, outcome) => {
        const [score] = scoreRoundFromOutcome(outcome)
        return total + score
    }, 0)

    console.log("score:", score)
}
main()
