import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Dashboard(){

const [cats,setCats]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
axios.get("http://localhost:4000/categories")
.then(r=>{
setCats(Array.isArray(r.data)?r.data:[]);
setLoading(false);
})
.catch(()=>{
setCats([]);
setLoading(false);
});
},[]);

return(

<div className="container mt-5 py-4">

{/* Hero Section */}
<div className="text-center mb-5">
<h1 className="display-4 fw-bold mb-3">
<span className="text-gradient">🌱 GardenHub Forum</span>
</h1>
<p className="lead text-muted mb-4">
Welcome to GardenHub - Your community for all things gardening!
</p>
<p className="text-muted">
Share knowledge, ask questions, and grow together with fellow garden enthusiasts.
</p>
</div>

{/* Loading State */}
{loading && (
<div className="text-center py-5">
<div className="spinner-border text-success" role="status">
<span className="visually-hidden">Loading...</span>
</div>
<p className="text-muted mt-3">Loading categories...</p>
</div>
)}

{/* Categories Grid */}
{!loading && (
<>
<h3 className="mb-4 text-start">
<i className="bi bi-grid-3x3-gap-fill me-2"></i>
Explore Topics
</h3>

<div className="row g-4">

{cats.map(c=>

<div className="col-md-6 col-lg-4" key={c.id}>

<div className="topic-card card shadow-sm border-0 p-4 h-100 d-flex flex-column">

<div className="mb-3">
<div className="d-flex align-items-center mb-3">
<div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
<span style={{fontSize: '2rem'}}>💐</span>
</div>
<h4 className="topic-title mb-0">{c.name}</h4>
</div>

<p className="topic-desc mb-0">
{c.description || "Join the discussion and share your gardening experiences!"}
</p>
</div>

<div className="mt-auto">
<Link
className="btn btn-success w-100 big-btn"
to={"/category/"+c.id}
>
<i className="bi bi-arrow-right-circle me-2"></i>
Enter Discussion
</Link>
</div>

</div>

</div>

)}

</div>

{/* Empty State */}
{cats.length === 0 && (
<div className="text-center py-5">
<div className="card shadow-sm border-0 p-5">
<h4 className="text-muted mb-3">No categories available yet</h4>
<p className="text-muted">Check back soon for new discussion topics!</p>
</div>
</div>
)}
</>
)}

{/* Footer Info */}
<div className="mt-5 pt-4 border-top">
<div className="row text-center">
<div className="col-md-4 mb-3">
<div className="card border-0 bg-light p-4">
<h5 className="fw-bold">💬 Ask Questions</h5>
<p className="text-muted mb-0 small">Get answers from experienced gardeners</p>
</div>
</div>
<div className="col-md-4 mb-3">
<div className="card border-0 bg-light p-4">
<h5 className="fw-bold">🤝 Share Knowledge</h5>
<p className="text-muted mb-0 small">Help others with your expertise</p>
</div>
</div>
<div className="col-md-4 mb-3">
<div className="card border-0 bg-light p-4">
<h5 className="fw-bold">🌻 Grow Together</h5>
<p className="text-muted mb-0 small">Build a thriving garden community</p>
</div>
</div>
</div>
</div>

</div>

);

}
