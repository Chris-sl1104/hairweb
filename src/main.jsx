import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'  // 引入 Redux 的 Provider
import { store } from './redux/store'   // 引入配置好的 Redux store
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>  {/* 使用 Redux Provider 包裹应用 */}
            <App />
        </Provider>
    </StrictMode>,
)
