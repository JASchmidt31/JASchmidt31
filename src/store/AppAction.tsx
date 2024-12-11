export type AppAction = {
    payload?: any
    type: AppActionType
}

export enum AppActionType {
    DEFAULT_ACTION = 'DEFAULT_ACTION'
}

export interface AppStoreState {
    isLoggedIn : boolean
}

export const initialAppState : AppStoreState = {
    isLoggedIn : true
}
