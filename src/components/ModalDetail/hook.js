import { useReducer } from "react"

const ACTIONS = {
    UPDATE_OWNER: "update_owner",
}

const reducer = (state, action) => {
    switch (action.type) {
        
        case ACTIONS.UPDATE_OWNER:
            return {
                ...state,
                owner: action.payload
            }
        default: return state
    }
}

//Uses useReducer to manage all the states of the searchForm component
const useFormOwner = (initialOwn, initialPriv) => {

    //State are the states of the searchForm component, and dispatch is the method to update them , similar to useState
    //The reducer is the function that depending wich action we send , it will update one state or another
    const [state, dispatch] = useReducer(reducer, {
        owner: initialOwn,
    })

    return {
        ...state,
        updateDescription: owner =>
            dispatch({ type: ACTIONS.UPDATE_OWNER, payload: owner }),
    }
}

export default useFormOwner;