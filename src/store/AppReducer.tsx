import { AppAction, AppActionType, AppStoreState } from "./AppAction";

export const AppReducer = (state: AppStoreState, action: AppAction) : AppStoreState => {
    switch(action.type) {
        case AppActionType.DEFAULT_ACTION:
            return state
            default:
                return state
    }
}