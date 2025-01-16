import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";
import { IAppState, IUser } from "../appSlice";

interface RootStateCopy {
    app: IAppState,
    post: IPostState
}


export interface IPost {
    id: string;
    content: string;
    created_at: string,
    updated_at: string,
    user: IUser
}

export interface IPostState {
    posts: Record<string, IPost>;
    loading: boolean;
    take: number;
    skip: number;
    postIds: string[]
}

const initialState: IPostState = {
    posts: {},
    postIds: [],
    loading: false,
    take: 10,
    skip: 0
};

export const postSlice = createAppSlice({
    name: 'post',
    initialState,
    reducers: (create) => ({
        setPosts: create.reducer((state, action: PayloadAction<{ posts: IPostState['posts'] }>) => {
            state.posts = action.payload.posts
        }),
        createPost: create.asyncThunk(
            async ({ content }: { content: string }, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch('http://localhost:3001/api/post/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": `Bearer ${state.app.token}`
                    },
                    body: JSON.stringify({ content })
                });
                if (response.status !== 200) {
                    const error = await response.json()
                    return thunkApi.rejectWithValue(error)
                }

                const data: IPost = await response.json();
                data.user = state.app.user!
                return data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action) => {
                    // state.posts.push(action.payload)
                    const postId = action.payload.id
                    const temp: any = {}
                    temp[postId] = action.payload
                    state.posts = { ...temp, ...state.posts }
                    state.postIds.push(action.payload.id)
                    state.loading = false
                },
                rejected: (state) => {
                    state.loading = false
                }
            }
        ),
        loadPosts: create.asyncThunk(
            async (_, thunkApi) => {
                const state = thunkApi.getState() as RootStateCopy
                const response = await fetch(`http://localhost:3001/api/post/getAll?take=${state.post.take}&skip=${state.post.skip}`, {
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

                const data: IPost[] = await response.json();

                return data
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                fulfilled: (state, action) => {
                    const data = action.payload
                    data.forEach((post) => {
                        state.posts[post.id] = post
                        state.postIds.push(post.id)
                    })
                    state.loading = false
                },
                rejected: (state) => {
                    state.loading = false
                }
            }
        )
    })
})

export const { setPosts, createPost, loadPosts } = postSlice.actions

export const selectPosts = (state: RootStateCopy) => state.post.posts

export default postSlice.reducer