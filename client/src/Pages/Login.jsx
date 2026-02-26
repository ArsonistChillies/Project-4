import {useNavigate,Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Login(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");
const [loading,setLoading]=useState(false);

async function login(e){

e.preventDefault();
setError("");
setLoading(true);

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

}finally{
setLoading(false);
}

}

return(

<div className="min-vh-100 d-flex align-items-center justify-content-center py-5">

<div className="container" style={{maxWidth:450}}>

<div className="card shadow-lg border-0">

<div className="card-body p-5">

{/* Logo/Header */}
<div className="text-center mb-4">
<h1 className="display-5 fw-bold text-gradient mb-2">🌱 GardenHub</h1>
<p className="text-muted">Welcome back! Please login to your account</p>
</div>

{error && (
<div className="alert alert-danger" role="alert">
<i className="bi bi-exclamation-triangle-fill me-2"></i>
{error}
</div>
)}

<form onSubmit={login}>

<div className="mb-3">
<label className="form-label fw-semibold">Email Address</label>
<input
type="email"
className="form-control form-control-lg"
placeholder="Enter your email"
value={email}
onChange={e=>setEmail(e.target.value)}
required
/>
</div>

<div className="mb-4">
<label className="form-label fw-semibold">Password</label>
<input
type="password"
className="form-control form-control-lg"
placeholder="Enter your password"
value={password}
onChange={e=>setPassword(e.target.value)}
required
/>
</div>

<button 
className="btn btn-success btn-lg w-100 mb-3" 
disabled={loading}
>
{loading ? (
<>
<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
Logging in...
</>
) : (
'Login'
)}
</button>

</form>

<div className="text-center mt-4 pt-3 border-top">
<p className="text-muted mb-0">
Don't have an account? <Link to="/register" className="fw-bold text-decoration-none">Create one</Link>
</p>
</div>

</div>

</div>

</div>

</div>

);

}
