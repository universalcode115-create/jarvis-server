if(health.isOnline("Groq")){

try{

const reply=await groq.chat(message,history);

health.online("Groq");

return reply;

}catch{

health.offline("Groq");

}

}
