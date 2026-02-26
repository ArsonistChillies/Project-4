import {useParams,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";


export default function Category(){

const {id}=useParams();

const [questions,setQuestions]=useState([]);
const [catName,setCatName]=useState("");
const [loading,setLoading]=useState(true);

// LOAD QUESTIONS FOR THIS CATEGORY
useEffect(()=>{

axios.get("http://localhost:4000/questions/category/"+id)
.then(r=>{
setQuestions(Array.isArray(r.data)?r.data:[]);
setLoading(false);
})
.catch(()=>{
setQuestions([]);
setLoading(false);
});

// OPTIONAL: load category name for header
axios.get("http://localhost:4000/categories")
.then(r=>{
const found=r.data.find(c=>String(c.id)===String(id));
if(found) setCatName(found.name);
});

},[id]);

return(

<div className="container mt-4 py-4">

{/* Header Section */}
<div className="mb-4">
<Link to="/dashboard" className="btn btn-outline-secondary mb-3">
<i className="bi bi-arrow-left me-2"></i>
Back to Dashboard
</Link>

<div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
<div>
<h2 className="mb-2">
<span className="text-gradient">{catName || "Discussion Topic"}</span>
</h2>
<p className="text-muted mb-0">
<i className="bi bi-chat-dots me-2"></i>
{questions.length} {questions.length === 1 ? 'question' : 'questions'}
</p>
</div>

<Link to={"/ask?cat="+id} className="btn btn-success btn-lg big-btn">
<i className="bi bi-plus-circle me-2"></i>
Ask Question
</Link>
</div>
</div>

<hr className="mb-4"/>

{/* Loading State */}
{loading && (
<div className="text-center py-5">
<div className="spinner-border text-success" role="status">
<span className="visually-hidden">Loading...</span>
</div>
<p className="text-muted mt-3">Loading questions...</p>
</div>
)}

{/* NO QUESTIONS MESSAGE */}
{!loading && questions.length===0 && (

<div className="text-center py-5">
<div className="card shadow-sm border-0 p-5">
<div className="mb-4">
<span style={{fontSize: '4rem'}}>🌱</span>
</div>
<h4 className="mb-3">No questions yet</h4>
<p className="text-muted mb-4">Be the first to start a discussion in this category!</p>
<Link to={"/ask?cat="+id} className="btn btn-success btn-lg">
<i className="bi bi-plus-circle me-2"></i>
Ask the First Question
</Link>
</div>
</div>

)}

{/* QUESTIONS LIST */}
{!loading && questions.map(q=>

<Link key={q.id} to={"/question/"+q.id} className="text-decoration-none d-block mb-3">

<div className="card shadow-sm border-0 hover-shadow question-card">

<div className="card-body p-4">

<div className="d-flex justify-content-between align-items-start mb-2">
<h5 className="fw-bold text-dark mb-0 flex-grow-1">{q.title}</h5>
<span className="badge bg-success bg-opacity-10 text-success ms-3">
<i className="bi bi-chat-left-text me-1"></i>
Discussion
</span>
</div>

<p className="text-muted mb-3 mt-2">
{q.content.substring(0, 200)}{q.content.length > 200 ? "..." : ""}
</p>

<div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
<small className="text-secondary">
<i className="bi bi-person-circle me-1"></i>
{q.author_email || "Anonymous"}
</small>
<small className="text-secondary">
<i className="bi bi-calendar3 me-1"></i>
{new Date(q.created_at).toLocaleDateString('en-US', { 
year: 'numeric', 
month: 'short', 
day: 'numeric' 
})}
</small>
</div>

</div>

</div>

</Link>

)}

</div>

);

}
