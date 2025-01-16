import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { IAppState, IUser } from "../appSlice";
import { IPostState, loadPosts } from "../postSlice/postSlice";

interface RootStateCopy {
    app: IAppState,
    post: IPostState,
    user: IUserState
}


interface IUserState {
    followerCount: number,
    followingCount: number,
    loading: boolean,
    userSuggestions: IUser[],
    followers: IUser[],
    followings: IUser[],
}

const initialState: IUserState = {
    followerCount: 0,
    followingCount: 0,
    loading: false,
    userSuggestions: [],
    followers: [],
    followings: []
};

export const userSlice = createAppSlice({
    name: 'user',
    initialState,
    reducers: (create) => ({
        setFollowerCount: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${state.app.user?.username}/followers/count`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();
                return data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action: PayloadAction<{ count: number }>) => {
                    state.followerCount = action.payload.count
                    state.loading = false
                },
                rejected: (state) => {
                    state.loading = false
                }
            }
        ),
        setFollowingCount: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${state.app.user?.username}/followings/count`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();
                return data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action: PayloadAction<{ count: number }>) => {
                    state.followingCount = action.payload.count
                    state.loading = false
                },
                rejected: (state) => {
                    state.loading = false
                }
            }
        ),
        setUserSuggestions: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/userSuggestions?take=10&skip=0`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();
                console.log(data);

                return data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action: PayloadAction<IUser[]>) => {
                    state.userSuggestions = action.payload
                    state.loading = false
                },
                rejected: (state) => {
                    state.loading = false
                }
            }
        ),
        follow: create.asyncThunk(
            async ({ user_id }: { user_id: string }, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${user_id}/follow`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();
                thunkApi.dispatch(setUserSuggestions())
                thunkApi.dispatch(loadPosts())
                // return data
            },
            {
                fulfilled: (state) => {
                    state.followingCount += 1
                }
            }
        ),
        unFollow: create.asyncThunk(
            async ({ user_id }: { user_id: string }, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${user_id}/follow`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();
                thunkApi.dispatch(setUserSuggestions())
                thunkApi.dispatch(setFollowings())
                thunkApi.dispatch(loadPosts())

                // return data
            },
            {
                fulfilled: (state) => {
                    state.followingCount -= 1
                }
            }
        ),
        setFollowers: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${state.app.user?.username}/followers`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();

                // thunkApi.dispatch(setUserSuggestions())
                return data
            },
            {
                fulfilled: (state, action: PayloadAction<{ user: IUser }[]>) => {
                    state.followers = action.payload.map((e) => e.user)
                }
            }
        ),
        setFollowings: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/users/${state.app.user?.username}/followings`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }
                const data = await response.json();

                // thunkApi.dispatch(setUserSuggestions())
                return data
            },
            {
                fulfilled: (state, action: PayloadAction<{ following: IUser }[]>) => {
                    state.followings = action.payload.map((e) => e.following)
                }
            }
        )

    }),
});

export const { setFollowerCount, setFollowingCount, setUserSuggestions, follow, unFollow, setFollowers, setFollowings } = userSlice.actions

export default userSlice.reducer

export const selectFollowerCount = (state: RootStateCopy) => state.user.followerCount
export const selectFollowingCount = (state: RootStateCopy) => state.user.followingCount
export const selectUserSuggestions = (state: RootStateCopy) => state.user.userSuggestions
export const selectFollowers = (state: RootStateCopy) => state.user.followers
export const selectFollowings = (state: RootStateCopy) => state.user.followings
