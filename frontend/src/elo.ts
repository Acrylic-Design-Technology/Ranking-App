const expectation = (r1, r2) => 1 / (1 + Math.pow(10, (r1 - r2) / 400));
const updateScore = (rA, K, eA, newA) => rA + K*(newA  - eA);

export const updateRankings = (rA: number, rB: number, selected: string) => {
    const eA = expectation(rB, rA);
    const eB = expectation(rA, rB);

    return {
        rA: updateScore(rA, 42, eA, selected === "A" ? 1 : 0),
        rB: updateScore(rB, 42, eB, selected === "B" ? 1 : 0)
    }
};
