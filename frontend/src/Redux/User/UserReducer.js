const INITIAL_STATE = {
    currentUser: null,
    score: 0
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
        default:
            return state;
    }
}

export default userReducer;