// redux/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'dark',  // 初始模式设为 'dark'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
