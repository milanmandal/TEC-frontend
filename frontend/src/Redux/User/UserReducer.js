const INITIAL_STATE = {
    currentUser: null,
    score: 0,
    investedCompanies: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'UPDATE_SCORE':
            return {
                ...state,
                score: action.payload+1000
            }
        case 'UPDATE_SCORE_CRISIS':
            return{
                ...state,
                score: action.payload.currentScore + parseInt(action.payload.addScore)
            }
        case 'UPDATE_INVESTED_COMPANIES':
            return{
                ...state,
                investedCompanies: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;