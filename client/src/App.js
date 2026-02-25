import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Ask from "./Pages/Ask";
import Category from "./Pages/Category";
import Register from './Pages/Register'
function App(){

const user = localStorage.getItem("user");

return(

<BrowserRouter>

{/* NAVBAR RESTORED */}
<Navbar/>

<Routes>

<Route 
path="/" 
element={user ? <Navigate to="/dashboard"/> : <Login/>}
/>

<Route path="/register" element={<Register/>}/>

<Route 
path="/dashboard" 
element={
<Dashboard/>
}
/>

<Route 
path="/ask" 
element={
<Ask/>
}
/>

<Route 
path="/category/:id" 
element={
<Category/>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;