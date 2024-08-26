import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import {store, persistor} from './Redux/ReduxStore.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  </StrictMode>,
)
