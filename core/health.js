const health = {

    Gemini: true,

    Groq: true,

    OpenRouter: true,

    HuggingFace: true

};

function online(name){

    health[name]=true;

}

function offline(name){

    health[name]=false;

}

function isOnline(name){

    return health[name];

}

function all(){

    return health;

}

module.exports={

online,

offline,

isOnline,

all

};
