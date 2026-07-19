function formatResponse(provider,data){

let text="";

switch(provider){

case "gemini":
text=data?.candidates?.[0]?.content?.parts?.[0]?.text||"";
break;

case "groq":
text=data?.choices?.[0]?.message?.content||"";
break;

case "openrouter":
text=data?.choices?.[0]?.message?.content||"";
break;

case "huggingface":
text=data?.[0]?.generated_text||"";
break;

default:
text="No response";
}

return{

success:true,

provider,

text

};

}

module.exports=formatResponse;
