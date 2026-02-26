import {useNavigate,Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Register(){

const nav=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");
const [loading,setLoading]=useState(false);

async function register(e){

e.preventDefault();
setError("");
setLoading(true);

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
<p className="text-muted">Join our gardening community today!</p>
</div>

{error && (
<div className="alert alert-danger" role="alert">
<i className="bi bi-exclamation-triangle-fill me-2"></i>
{error}
</div>
)}

<form onSubmit={register}>

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
<small className="text-muted">We'll never share your email with anyone else.</small>
</div>

<div className="mb-4">
<label className="form-label fw-semibold">Password</label>
<input
type="password"
className="form-control form-control-lg"
placeholder="Create a password"
value={password}
onChange={e=>setPassword(e.target.value)}
required
minLength={6}
/>
<small className="text-muted">Must be at least 6 characters long.</small>
</div>

<button 
className="btn btn-success btn-lg w-100 mb-3"
disabled={loading}
>
{loading ? (
<>
<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
Creating account...
</>
) : (
'Create Account'
)}
</button>

</form>

<div className="text-center mt-4 pt-3 border-top">
<p className="text-muted mb-0">
Already have an account? <Link to="/" className="fw-bold text-decoration-none">Login here</Link>
</p>
</div>

</div>

</div>

</div>

</div>

);
}
