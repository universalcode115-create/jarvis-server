if(health.isOnline("HuggingFace")){

try{

const reply=await huggingface.chat(message,history);

health.online("HuggingFace");

return reply;

}catch{

health.offline("HuggingFace");

}

}
