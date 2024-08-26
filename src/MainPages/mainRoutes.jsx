import MainWrapper from "./mainWrapper";
import { Route } from "react-router-dom";
import PlanerPage from "./planerPage";

export default  [
    <Route key={'/home'} path="/home" element={<MainWrapper><PlanerPage/></MainWrapper>} />
]