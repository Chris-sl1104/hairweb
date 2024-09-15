// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid'; // 用于生成唯一 ID

// 初始状态，包含一个空的购物车数组
const initialState = {
    items: [], // 存储购物车中的商品
};

// 创建购物车 slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 添加商品到购物车
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(cartItem  => cartItem .id === item.id);

            if (existingItem) {
                // 如果商品已存在，增加其数量
                existingItem.quantity += item.quantity;
            } else {
                // 如果商品不存在，添加到购物车并设置数量为 1
                state.items.push(item);
            }
        },

        // 移除商品
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },

        // 清空购物车
        clearCart: (state) => {
            state.items = [];
        },

        // 更新商品数量
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
            }
        },
    },
});

// 导出 actions
export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;

// 导出 reducer
export default cartSlice.reducer;
