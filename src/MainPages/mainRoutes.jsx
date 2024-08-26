import MainWrapper from "./mainWrapper";
import { Route } from "react-router-dom";
import PlanerPage from "./planerPage";
import AccountManagePage from "./accountManagePage";

export default  [
    <Route key={'/home'} path="/home" element={<MainWrapper><PlanerPage/></MainWrapper>} />,
    <Route key={'/account/*'} path="/account/*" element={<MainWrapper><AccountManagePage/></MainWrapper>} />
]