if(health.isOnline("Gemini")){

try{

const reply=await gemini.chat(message,history);

health.online("Gemini");

return reply;

}catch{

health.offline("Gemini");

}

}
