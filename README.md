# Advent of code 2022 (not quite)

### This is a repo containing puzzles I decided to attempt to solve using Typescript after watching others face them.

## Guide
- Daily puzzles are grouped in the puzzles folder and named by that day.

- Each puzzle folder contains: 
    - puzzle input ```input.txt``` 
    - example input ```example.txt```
    - lib file ```lib.ts```
    - lib test file ```lib.test.ts```
    - part one solution ```part1.ts```
    - part two solution ```part2.ts```

- Utility functions can be found in the root ```utils``` folder.

- Run tests for each puzzle day using:
    ```bash
    npm test [day]

    # example
    npm test day2
    ```

- Run solution for each puzzle day using:
    ```bash
    npm run day[day]/part[part]

    # example (for day 2 part 1)
    npm run day2/part1
    ```