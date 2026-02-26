import {useNavigate,Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Login(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");

async function login(e){

e.preventDefault();
setError("");

try{

const res=await axios.post("http://localhost:4000/auth/login",{email,password});

// Store both user ID and token
localStorage.setItem("userId",res.data.id);
localStorage.setItem("token",res.data.token);
localStorage.setItem("userEmail",res.data.email);

nav("/dashboard");

}catch(err){
console.error(err.response?.data);

// Display specific error message from server
const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
setError(errorMessage);

}

}

return(

<div className="container mt-5" style={{maxWidth:400}}>

<h2 className="text-center mb-4">Login</h2>

{error && (
<div className="alert alert-danger" role="alert">
{error}
</div>
)}

<form onSubmit={login}>

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
/>

<button className="btn btn-dark w-100">Login</button>

</form>

<div className="text-center mt-3">
<Link to="/register">Create an account</Link>
</div>

</div>

);

}