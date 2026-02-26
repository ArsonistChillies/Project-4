import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Register(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");

async function register(e){

e.preventDefault();
setError("");

try{

const res=await axios.post("http://localhost:4000/auth/register",{email,password});

// Store both user ID and token
localStorage.setItem("userId",res.data.id);
localStorage.setItem("token",res.data.token);
localStorage.setItem("userEmail",res.data.email);

nav("/dashboard");

}catch(err){

// Display specific error message from server
const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
setError(errorMessage);

}

}

return(

<div className="container mt-5" style={{maxWidth:400}}>

<h2 className="text-center mb-4">Create Account</h2>

{error && (
<div className="alert alert-danger" role="alert">
{error}
</div>
)}

<form onSubmit={register}>

<input
type="email"
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
minLength={6}
/>

<button className="btn btn-dark w-100">
Register
</button>

</form>

</div>

);
}