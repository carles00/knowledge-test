import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { dogStore} from './Api/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={dogStore}>
      <App />
    </Provider>
  </StrictMode>,
)
