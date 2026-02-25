import express from "express";
import db from "../dataDBConnections.js";

const router = express.Router();

router.get("/", async(req,res)=>{

try{

const [rows] = await db.query(
"SELECT id,name,description FROM categories ORDER BY name"
);

res.json(rows);

}catch(err){

console.log(err);
res.status(500).send("Failed");

}

});

export default router;