import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Ask from "./Pages/Ask";
import Category from "./Pages/Category";
import Register from './Pages/Register';
import Question from './Pages/Question';
function App(){

const userId = localStorage.getItem("userId");

return(

<BrowserRouter>

{/* NAVBAR RESTORED */}
<Navbar/>

<Routes>

<Route 
path="/" 
element={userId ? <Navigate to="/dashboard"/> : <Login/>}
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

<Route 
path="/question/:id" 
element={
<Question/>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;