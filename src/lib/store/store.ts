import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import appSlice from './features/appSlice'
import postSlice from './features/postSlice/postSlice'
import userSlice from './features/userSlice/userSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice,
            app: appSlice,
            post: postSlice,
            user: userSlice
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']