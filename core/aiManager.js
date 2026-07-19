const gemini=require("../providers/gemini");

const groq=require("../providers/groq");

const openrouter=require("../providers/openrouter");

const huggingface=require("../providers/huggingface");

const providers=[

gemini,

groq,

openrouter,

huggingface

];

async function ask(message,memory){

for(const provider of providers){

try{

const result=await provider.chat(message,memory);

if(result.success){

return result;

}

}catch(e){

console.log("Provider Failed");

}

}

return{

success:false,

text:"All AI Providers Offline"

};

}

module.exports={ask};
