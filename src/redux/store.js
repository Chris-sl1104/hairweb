// 从 Redux Toolkit 中引入 configureStore，用于创建 Redux store
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// 引入 themeReducer，这个 reducer 是在 themeSlice.js 中使用 createSlice 创建的
import themeReducer from './themeSlice';

// 使用 configureStore 创建 Redux store，并将 themeReducer 注册到 store 中
export const store = configureStore({
    reducer: {
        // 定义 state 中的 "theme" 切片，将其由 themeReducer 管理
        theme: themeReducer,
        cart: cartReducer, // 注册 cartReducer
    },
});
