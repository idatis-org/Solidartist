import { useReducer } from "react"

const ACTIONS = {
    UPDATE_PROFILE_PHOTO: "update_profile_photo",
    UPDATE_WALL_PHOTO: "update_wall_photo",
    UPDATE_DESCRIPTION: "update_description",
    UPDATE_PRIVACITY: "update_privacity"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_PROFILE_PHOTO:
            return {
                ...state,
                profilePhoto: action.payload,
            }
        case ACTIONS.UPDATE_WALL_PHOTO:
            return {
                ...state,
                wallPhoto: action.payload
            }
        case ACTIONS.UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case ACTIONS.UPDATE_PRIVACITY:
            return {
                ...state,
                privacity: action.payload
            }

        default: return state
    }
}

//Uses useReducer to manage all the states of the searchForm component
const useForm = (initialProfilePhoto, initialWallPhoto, initialDesc, initialPriv) => {

    //State are the states of the searchForm component, and dispatch is the method to update them , similar to useState
    //The reducer is the function that depending wich action we send , it will update one state or another
    const [state, dispatch] = useReducer(reducer, {
        profilePhoto: initialProfilePhoto,
        wallPhoto: initialWallPhoto,
        description: initialDesc,
        privacity: initialPriv
    })

    return {
        ...state,
        updateProfilePhoto: profilePhoto =>
            dispatch({ type: ACTIONS.UPDATE_PROFILE_PHOTO, payload: profilePhoto }),
        updateWallPhoto: wallPhoto =>
            dispatch({ type: ACTIONS.UPDATE_WALL_PHOTO, payload: wallPhoto }),
        updateDescription: description =>
            dispatch({ type: ACTIONS.UPDATE_DESCRIPTION, payload: description }),
        updatePrivacity: privacity =>
            dispatch({ type: ACTIONS.UPDATE_PRIVACITY, payload: privacity })
    }
}

export default useForm;