import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Dashboard(){

const [cats,setCats]=useState([]);

useEffect(()=>{
axios.get("http://localhost:4000/categories")
.then(r=>setCats(Array.isArray(r.data)?r.data:[]))
.catch(()=>setCats([]));
},[]);

return(

<div className="container mt-4">

<h2 className="mb-4">🌱 GardenHub Forum</h2>
<p className="lead mb-4">Welcome to GardenHub - Your community for all things gardening!</p>

<div className="row">

{cats.map(c=>

<div className="col-md-6" key={c.id}>

<div className="card shadow-lg border-0 p-4 mb-4">

<h4 className="fw-bold">{c.name}</h4>

<p className="text-muted mt-2">
{c.description || ""}
</p>

<Link
className="btn btn-success mt-2"
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