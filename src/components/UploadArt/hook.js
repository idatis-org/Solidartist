import { useReducer } from "react"

const ACTIONS = {
    UPDATE_ART_CONTENT: "update_art_content",
    UPDATE_TITLE: "update_title",
    UPDATE_DESCRIPTION: "update_description",
    UPDATE_SELL_PRICE: "update_sell_price",
    UPDATE_PIECE_TYPE: "update_piece_type",
    UPDATE_CATEGORY: "update_category",
    UPDATE_FRONT_PAGE: "update_front_page",
    UPDATE_COLLECTION: "update_collection",
    RESET_FORM: "reset_form"
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_ART_CONTENT:
            return {
                ...state,
                artContent: action.payload,
            }
        case ACTIONS.UPDATE_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case ACTIONS.UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case ACTIONS.UPDATE_SELL_PRICE:
            return {
                ...state,
                sellPrice: action.payload
            }
        case ACTIONS.UPDATE_PIECE_TYPE:
            return {
                ...state,
                pieceType: action.payload
            }
        case ACTIONS.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case ACTIONS.UPDATE_FRONT_PAGE:
            return {
                ...state,
                frontPage: action.payload
            }
        case ACTIONS.UPDATE_COLLECTION:
            return {
                ...state,
                collection: action.payload
            }
        case ACTIONS.RESET_FORM:
            return {
                artContent: "",
                title: "",
                description: "",
                sellPrice: 0,
                category: '',
                pieceType: '',
                frontPage: '',
                collection: null
            }
        default: return state
    }
}

//Uses useReducer to manage all the states of the searchForm component
const useFormArt = () => {

    //State are the states of the searchForm component, and dispatch is the method to update them , similar to useState
    //The reducer is the function that depending wich action we send , it will update one state or another
    const [state, dispatch] = useReducer(reducer, {
        artContent: "",
        title: "",
        description: "",
        sellPrice: 0,
        category: '',
        pieceType: '',
        frontPage: '',
        collection: null
    })

    return {
        ...state,
        updateArtContent: artContent =>
            dispatch({ type: ACTIONS.UPDATE_ART_CONTENT, payload: artContent }),
        updateTitle: title =>
            dispatch({ type: ACTIONS.UPDATE_TITLE, payload: title }),
        updateDescription: description =>
            dispatch({ type: ACTIONS.UPDATE_DESCRIPTION, payload: description }),
        updateSellPrice: sellPrice =>
            dispatch({ type: ACTIONS.UPDATE_SELL_PRICE, payload: sellPrice }),
        updateCategory: category =>
            dispatch({ type: ACTIONS.UPDATE_CATEGORY, payload: category }),
        updatePieceType: pieceType =>
            dispatch({ type: ACTIONS.UPDATE_PIECE_TYPE, payload: pieceType }),
        updateFrontPage: frontPage =>
            dispatch({ type: ACTIONS.UPDATE_FRONT_PAGE, payload: frontPage }),
        updateCollection: collection =>
            dispatch({ type: ACTIONS.UPDATE_COLLECTION, payload: collection }),
        resetForm: () =>
            dispatch({ type: ACTIONS.RESET_FORM }),
    }
}

export default useFormArt;