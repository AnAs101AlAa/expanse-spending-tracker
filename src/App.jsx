import './index.css';
import accountRoutes from './AccountPages/accountRoutes';
import { Routes, BrowserRouter } from 'react-router-dom';
import mainRoutes from './MainPages/mainRoutes';
import { NotificationProvider } from './globalPopUps/notificationProvider';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          {accountRoutes}
          {mainRoutes}
        </Routes>
      </BrowserRouter>
    </NotificationProvider>

  );
}

export default App;