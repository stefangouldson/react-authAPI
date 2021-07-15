import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    email: '',
    password: '',
    error: false,
    token: null,
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,

    reducers: {
        setEmail(state, action){
            state.email = action.payload
        },
        setPassword(state, action){
            state.password = action.payload
        },
        setToken(state, action){
            state.token = action.payload.token
            localStorage.setItem('user-token', JSON.stringify(action.payload.token))
        },
        setError(state, action){
            state.error = action.payload
        },

        resetForm(state){
            state.email = '';
            state.password = '';
        },

        logout(state){
            state.token = null
            localStorage.removeItem('user-token')
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;