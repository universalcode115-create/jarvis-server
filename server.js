require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const chatRoute = require("./routes/chat");
const imageRoute = require("./routes/image");
const voiceRoute = require("./routes/voice");

const app = express();

app.use(cors());

app.use(helmet({
    crossOriginResourcePolicy:false
}));

app.use(express.json({
    limit:"20mb"
}));

app.use(express.urlencoded({
    extended:true
}));

app.use(morgan("dev"));

app.get("/",(req,res)=>{

    res.json({

        success:true,

        name:"Jarvis AI Server",

        version:"2.0",

        status:"Online",

        providers:[
            "Gemini",
            "Groq",
            "OpenRouter",
            "HuggingFace"
        ]

    });

});

app.use("/chat",chatRoute);

app.use("/image",imageRoute);

app.use("/voice",voiceRoute);

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"Route Not Found"

    });

});

app.use((err,req,res,next)=>{

    console.log(err);

    res.status(500).json({

        success:false,

        message:"Internal Server Error"

    });

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{

console.log("================================");

console.log("Jarvis Server Started");

console.log("Port :",PORT);

console.log("================================");

});
