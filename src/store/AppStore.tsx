import { createContext, useContext, useReducer } from "react";
import { AppAction, AppStoreState, initialAppState } from "./AppAction";
import { AppReducer } from "./AppReducer";

const storeContext = createContext<AppStoreState>(initialAppState)
const dispatchContext = createContext<React.Dispatch<AppAction>>(() => {});

export const AppStore = ({children} : {children : React.ReactNode }) => {
    const [store, dispatch] = useReducer(AppReducer, initialAppState)

    return (
        <dispatchContext.Provider value={dispatch}>
            <storeContext.Provider value={store}>
                {children}
            </storeContext.Provider>
        </dispatchContext.Provider>
    )
}

export function useAppStore() {
    return useContext(storeContext)
}

export function useAppDispatch() {
    return useContext(dispatchContext)
}