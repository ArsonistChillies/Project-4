import {useNavigate,Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Login(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

async function login(e){

e.preventDefault();

try{

const res=await axios.post("/auth/login",{email,password});
localStorage.setItem("user",res.data.id);

nav("/dashboard");

}catch(err){
console.error(err.response?.data);

alert("Invalid login");

}

}

return(

<div className="container mt-5" style={{maxWidth:400}}>

<h2 className="text-center mb-4">Login</h2>

<form onSubmit={login}>

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

<button className="btn btn-dark w-100">Login</button>

</form>

<div className="text-center mt-3">
<Link to="/register">Create an account</Link>
</div>

</div>

);

}