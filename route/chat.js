const express=require("express");

const router=express.Router();

const ai=require("../core/aiManager");

const memory=require("../core/memory");

router.post("/",async(req,res)=>{

try{

const{

message,

userId="guest"

}=req.body;

if(!message){

return res.status(400).json({

success:false,

message:"Message Required"

});

}

memory.save(userId,"user",message);

const history=memory.get(userId);

const reply=await ai.ask(message,history);

memory.save(userId,"assistant",reply.text);

res.json(reply);

}

catch(e){

console.log(e);

res.status(500).json({

success:false

});

}

});

module.exports=router;
