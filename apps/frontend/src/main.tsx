import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import './config/i18n'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
