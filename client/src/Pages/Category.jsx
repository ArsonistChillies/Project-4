import {useParams,Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";


export default function Category(){

const {id}=useParams();

const [questions,setQuestions]=useState([]);
const [catName,setCatName]=useState("");

// LOAD QUESTIONS FOR THIS CATEGORY
useEffect(()=>{

axios.get("http://localhost:4000/questions/category/"+id)
.then(r=>{
setQuestions(Array.isArray(r.data)?r.data:[]);
})
.catch(()=>setQuestions([]));

// OPTIONAL: load category name for header
axios.get("http://localhost:4000/categories")
.then(r=>{
const found=r.data.find(c=>String(c.id)===String(id));
if(found) setCatName(found.name);
});

},[id]);

return(

<div className="container mt-4">

<h2 className="mb-3">
 {catName || "Coffee Topic"}
</h2>

{/* ASK BUTTON — ONLY ONE */}

<Link to={"/ask?cat="+id} className="btn btn-dark">
Ask Question
</Link>



{/* NO QUESTIONS MESSAGE */}
{questions.length===0 && (

<div className="alert alert-light border">
No questions yet. Be the first to ask!
</div>

)}

{/* QUESTIONS LIST */}
{questions.map(q=>

<Link key={q.id} to={"/question/"+q.id} className="text-decoration-none">

<div className="card shadow-sm border-0 mb-3 hover-shadow">

<div className="card-body">

<h5 className="fw-bold text-dark">{q.title}</h5>

<p className="text-muted mb-1">
{q.content.substring(0, 150)}{q.content.length > 150 ? "..." : ""}
</p>

<small className="text-secondary">
Posted by {q.author_email || "Anonymous"} on {new Date(q.created_at).toLocaleDateString()}
</small>

</div>

</div>

</Link>

)}

</div>

);

}