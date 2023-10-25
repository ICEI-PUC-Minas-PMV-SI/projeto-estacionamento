import { BrowserRouter } from "react-router-dom";

import Cadastro from "../components/Cadastro";
import Login from "../components/Login";

export function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Router path="/" element={<Login />}/>
            <Router path="/cadastro" element={<Cadastro />}/>
        </Routes>
        </BrowserRouter>
    )
}