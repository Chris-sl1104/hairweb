// ThemeProvider.js
import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 创建一个上下文来管理主题切换
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function MyThemeProvider({ children }) {
    const [mode, setMode] = useState('light'); // 默认是 'light' 模式

    // 切换主题模式
    const colorMode = {
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    };

    // 创建主题，根据 mode 变化
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    );
}

// 自定义的 Hook，用于在其他组件中使用主题切换功能
export const useColorMode = () => useContext(ColorModeContext);
