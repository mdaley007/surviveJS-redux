const initialState = () => {
    return {

    }
}

// export note
const noteReducer = (state=initialState(), action) => {
    switch (action.type) {
        case 'CREATE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        case 'UPDATE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        case 'DELETE':
            return Object.assign(
                {},
                state,
                {

                },
            )
        default:
            return state
    } // switch
}

export default noteReducer
