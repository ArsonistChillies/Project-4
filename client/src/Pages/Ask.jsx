import {useNavigate,useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Ask(){

const nav = useNavigate();
const [params] = useSearchParams();

const categoryId = params.get("cat") || 1;

const [title,setTitle]=useState("");
const [content,setContent]=useState("");

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

}

}

return(

<div className="container mt-4" style={{maxWidth:600}}>

<h2 className="mb-4">Ask a Question</h2>

<form onSubmit={submit}>

<input
className="form-control mb-2"
placeholder="Question title"
value={title}
onChange={e=>setTitle(e.target.value)}
required
/>

<textarea
className="form-control mb-3"
placeholder="Write your question..."
value={content}
onChange={e=>setContent(e.target.value)}
required
/>

<button className="btn btn-dark w-100">
Post Your Question
</button>

</form>

</div>

);
}