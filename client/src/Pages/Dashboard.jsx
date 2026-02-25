import {useEffect,useState} from "react";
import api from "../api";
import {Link} from "react-router-dom";

export default function Dashboard(){

const [cats,setCats]=useState([]);

useEffect(()=>{
api.get("/categories")
.then(r=>setCats(Array.isArray(r.data)?r.data:[]))
.catch(()=>setCats([]));
},[]);


/* PROFESSOR SAFE DESCRIPTIONS */
const descriptions={

};

return(

<div className="container mt-4">

<h2 className="mb-4"></h2>

<div className="row">

{cats.map(c=>

<div className="col-md-6" key={c.id}>

<div className="card shadow-lg border-0 p-4 mb-4">

<h4 className="fw-bold">{c.name}</h4>

<p className="text-muted mt-2">
{descriptions[c.name] || ""}
</p>

<Link
className="btn btn-dark mt-2"
to={"/category/"+c.id}
>
Enter the Discussion
</Link>

</div>

</div>

)}

</div>

</div>

);

}