export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

export const updateScore = score => ({
    type: 'UPDATE_SCORE',
    payload: score
})

export const updateScoreCrisis = score => ({
    type: 'UPDATE_SCORE_CRISIS',
    payload: score
})

export const updateInvestedCompanies = investedCompanies => ({
    type: 'UPDATE_INVESTED_COMPANIES',
    payload: investedCompanies
})