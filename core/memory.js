const chats={};

function save(id,role,text){

if(!chats[id]) chats[id]=[];

chats[id].push({

role,

content:text

});

if(chats[id].length>20){

chats[id].shift();

}

}

function get(id){

return chats[id]||[];

}

module.exports={

save,

get

};
