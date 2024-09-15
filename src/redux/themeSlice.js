// 引入 Redux Toolkit 中的 createSlice 函数，用于简化创建 reducer 和 action
import { createSlice } from '@reduxjs/toolkit';

// 定义初始状态对象，包含一个 mode 属性，初始值为 'dark'
// 这个状态将用于控制应用的主题（'light' 或 'dark'）
const initialState = {
    mode: 'dark',  // 初始模式设为 'dark'
};

// 使用 createSlice 创建一个名为 'theme' 的状态切片（slice）
// createSlice 会自动生成 action creators 和 reducer 函数
const themeSlice = createSlice({
    name: 'theme', // 定义这个 slice 的名称，后续自动生成的 action type 会以 'theme/' 为前缀
    initialState,  // 指定初始状态为上面定义的 initialState 对象
    reducers: {    // 定义该 slice 包含的 reducers 函数，每个函数会成为一个 action
        // toggleTheme reducer：用于切换主题模式
        // 接收当前 state 并修改其 mode 属性
        toggleTheme: (state) => {
            // 使用 Immer 库的特性，可以直接修改 state
            // 根据当前 mode 的值切换到 'light' 或 'dark'
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        // setTheme reducer：用于将主题模式设置为指定值
        // 接收当前 state 和一个 action，action.payload 包含新模式值
        setTheme: (state, action) => {
            // 将 state.mode 设置为 action.payload 中的值
            // 这里使用 action.payload 来动态地设置主题
            state.mode = action.payload;
        }
    }
});

// 导出自动生成的 action creators
// toggleTheme 和 setTheme 是函数，可以在组件中用于派发 actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// 导出该 slice 的 reducer 函数，用于在 store 中注册
// Redux Toolkit 会自动将该函数连接到 store，并处理状态更新
export default themeSlice.reducer;
