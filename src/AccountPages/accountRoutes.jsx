import NewAccForm from './createAccPage';
import LoginForm from './loginPage';
import { Route } from 'react-router-dom';
import AccountMain from './accountWrapper';
import MainMenuPage from './mainMenuPage';

export default [
    <Route key={'/'} path="/" element={<AccountMain><MainMenuPage/></AccountMain>} />,
    <Route key={'/Login'} path='/Login' element={<AccountMain><LoginForm /></AccountMain>} />,
    <Route key={'/Register'} path='/Register' element={<AccountMain><NewAccForm /></AccountMain>} />
]