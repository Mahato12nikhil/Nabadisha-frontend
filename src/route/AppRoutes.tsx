import Account from "../Pages/Account";
import Login from "../Pages/Login";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Layout from "../components/Layout";
import Home from "../Pages/Home";
import DashBoard from "../Pages/dashboard/DashBoard";


type RoutePath= "/" | "/account" | "/login" | "/activities" | "/settings" | "/treasurer" | "/admin" | "/dashboard";


export interface RouteProps<T>{
   path:T,
   element: React.ReactNode;
}
export const routes: RouteProps<RoutePath>[]=[
    {path: "/", element: <Layout/> },
    {path: "/account", element: <Account/> },
    {path: "/login", element: <Login/> }, 
    {path:"/dashboard", element: <DashBoard/>}
]
   


const AppRoutes : React.FC=()=>{
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} /> 
                        {routes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                        <Route path="*" element={<Navigate to="/" replace/>} />
                    </Route>
            </Routes>
        </BrowserRouter>
    )
    
}
export default AppRoutes;