import {useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../api";

export default function Register(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

async function register(e){

e.preventDefault();

try{

const res=await api.post("/auth/register",{email,password});

localStorage.setItem("user",res.data.id);

nav("/dashboard");

}catch{

alert("Register failed");

}

}

return(

<div className="container mt-5" style={{maxWidth:400}}>

<h2 className="text-center mb-4">Create Account</h2>

<form onSubmit={register}>

<input
className="form-control mb-2"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
required
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
required
/>

<button className="btn btn-dark w-100">
Register
</button>

</form>

</div>

);
}