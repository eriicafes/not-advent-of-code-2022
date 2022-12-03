import fs from "fs/promises"
import path from "path"

type ReadOptions = {
    day: number
    example?: boolean
}

export const readInput = ({ day, example }: ReadOptions) => {
    const filePath = path.resolve(path.join(
        "puzzles",
        `day${day}`,
        example ? "example.txt" : "input.txt",
    ))

    return fs.readFile(filePath, "utf8")
}
