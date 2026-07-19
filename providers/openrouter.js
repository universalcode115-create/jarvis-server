if(health.isOnline("OpenRouter")){

try{

const reply=await openrouter.chat(message,history);

health.online("OpenRouter");

return reply;

}catch{

health.offline("OpenRouter");

}

}
