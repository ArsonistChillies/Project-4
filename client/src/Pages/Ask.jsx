import {useNavigate,useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Ask(){

const nav = useNavigate();
const [params] = useSearchParams();

const categoryId = params.get("cat") || 1;

const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [loading,setLoading]=useState(false);

async function submit(e){

e.preventDefault();

if(!categoryId){
alert("Missing category");
return;
}

const userId = localStorage.getItem("userId");
if(!userId){
alert("Please log in to post a question");
nav("/");
return;
}

setLoading(true);

try{

await axios.post("http://localhost:4000/questions",{
title,
content,
category_id:categoryId,
user_id:userId
});

nav("/category/"+categoryId);

}catch(err){

console.log(err.response?.data);
alert("Failed to post question");

}finally{
setLoading(false);
}

}

return(

<div className="container mt-5 py-4" style={{maxWidth:700}}>

{/* Header */}
<div className="text-center mb-5">
<h2 className="display-6 fw-bold mb-3">
<span className="text-gradient">Ask a Question</span>
</h2>
<p className="text-muted">
Share your gardening question with the community and get expert advice!
</p>
</div>

{/* Form Card */}
<div className="card shadow-lg border-0">

<div className="card-body p-5">

<form onSubmit={submit}>

<div className="mb-4">
<label className="form-label fw-semibold">
<i className="bi bi-pencil-square me-2"></i>
Question Title
</label>
<input
className="form-control form-control-lg"
placeholder="e.g., How do I care for tomato plants in summer?"
value={title}
onChange={e=>setTitle(e.target.value)}
required
maxLength={200}
/>
<small className="text-muted">Be specific and clear in your title</small>
</div>

<div className="mb-4">
<label className="form-label fw-semibold">
<i className="bi bi-card-text me-2"></i>
Question Details
</label>
<textarea
className="form-control"
rows="8"
placeholder="Provide more details about your question. Include any relevant information that might help others answer..."
value={content}
onChange={e=>setContent(e.target.value)}
required
style={{minHeight: '200px'}}
/>
<small className="text-muted">
The more details you provide, the better answers you'll receive
</small>
</div>

<div className="d-grid gap-2">
<button 
className="btn btn-success btn-lg big-btn" 
disabled={loading}
>
{loading ? (
<>
<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
Posting...
</>
) : (
<>
<i className="bi bi-send me-2"></i>
Post Your Question
</>
)}
</button>

<button 
type="button"
className="btn btn-outline-secondary"
onClick={() => nav("/category/"+categoryId)}
disabled={loading}
>
Cancel
</button>
</div>

</form>

</div>

</div>

{/* Tips Section */}
<div className="card border-0 bg-light mt-4">
<div className="card-body p-4">
<h6 className="fw-bold mb-3">
<i className="bi bi-lightbulb me-2"></i>
Tips for asking great questions:
</h6>
<ul className="mb-0 text-muted small">
<li>Make your title clear and specific</li>
<li>Include relevant details about your situation</li>
<li>Mention what you've already tried</li>
<li>Be respectful and courteous to the community</li>
</ul>
</div>
</div>

</div>

);
}
