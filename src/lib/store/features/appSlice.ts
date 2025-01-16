import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";


export interface IUser {
    username: string;
    name: string | null,
    id?: string
}

export interface IAppState {
    user: IUser | null;
    isLogged: boolean;
    token: string | null;
    loading: boolean;
}
const initialState: IAppState = {
    user: null,
    isLogged: false,
    token: null,
    loading: true,
};
export const appSlice = createAppSlice({
    name: 'app',
    initialState,
    reducers: (create) => ({
        setUser: create.reducer((state, action: PayloadAction<{ user: IAppState['user'] }>) => {
            state.user = action.payload.user
        }),
        logout: create.reducer((state) => {
            localStorage
            state.user = null;
            state.isLogged = false;
            state.token = null;
            state.loading = false
        }),
        logoutAsync: create.asyncThunk(
            async (payload, thunkApi) => {
                localStorage.removeItem("jwt_token")
                thunkApi.dispatch(logout())
            }
        ),
        setUserAsync: create.asyncThunk(
            async (token: string, thunkApi) => {
                const response = await fetch('http://localhost:3001/api/user/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }

                localStorage.setItem("jwt_token", token)
                const data = await response.json();

                return { token, user: data }
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action) => {
                    state.token = action.payload.token
                    state.user = action.payload.user
                    state.isLogged = true
                    state.loading = false;
                },
                rejected: (state) => {
                    state.loading = false;
                }
            }
        ),
        login: create.asyncThunk(
            async ({ username, password }: { username: string, password: string }, thunkApi) => {
                const response = await fetch('http://localhost:3001/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",

                    },
                    body: JSON.stringify({ username, password }),
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }

                const data = await response.json();
                thunkApi.dispatch(setUserAsync(data.token))
                return data
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, action) => {
                    console.log(action.payload);

                    // state.loading = false;
                    // state.isLogged = true;
                    // state.token = action.payload.token;

                },
                rejected: (state, action: any) => {
                    state.loading = false;
                    alert(action.payload?.error || "An error occurred");
                }
            }
        ),
        updateProfile: create.asyncThunk(
            async ({ name }: { name: string }, thunkApi) => {
                const state = thunkApi.getState() as { app: IAppState }
                const response = await fetch('http://localhost:3001/api/user/profile', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`

                    },
                    body: JSON.stringify({ name }),
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }

                const data = await response.json();
                thunkApi.dispatch(setUser({ user: data }))
                return data
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, action) => {
                    console.log(action.payload);

                    state.loading = false;
                    // state.isLogged = true;
                    // state.token = action.payload.token;

                },
                rejected: (state, action: any) => {
                    state.loading = false;
                    alert(action.payload?.error || "An error occurred");
                }
            }
        ),
    }),
});

export const { setUserAsync, logout, login, logoutAsync, setUser, updateProfile } = appSlice.actions;

export default appSlice.reducer;

/**
 * Selectors
 */
export const selectUser = (state: { app: IAppState }) => state.app.user;

export const selectIsLogged = (state: { app: IAppState }) => state.app.isLogged;

export const selectToken = (state: { app: IAppState }) => state.app.token;

export const selectAppLoading = (state: { app: IAppState }) => state.app.loading;