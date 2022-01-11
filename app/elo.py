def calc_expectation(r1: float, r2: float) -> float:
    return 1 / (1 + (10**(r1 - r2)) / 400)

def update_score(current: float, K: int, expectation: float, new: float) ->  float:
    return current + K*(new  - expectation)

def update_rankings(rA: float, rB: float, selected: str) -> dict:
    eA = calc_expectation(rB, rA)
    eB = calc_expectation(rA, rB)
    k_factor = 42

    return dict(
        rA=update_score(rA, k_factor, eA, 1 if selected == "A" else 0),
        rB=update_score(rB, k_factor, eB, 1 if selected == "B" else 0)
    )

